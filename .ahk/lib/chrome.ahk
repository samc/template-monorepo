#Include "array.ahk"
#Include "delay.ahk"
#Include "jxon.ahk"
#Include "shell.ahk"
#Include "websocket.ahk"

class Chrome {
  static DebugPort := 9222
  static WaitFor := 3

  GenerateRunCommand(Url, Flags) {
    Target := this.ChromePath

    RemoteDebuggingPortFlag := Format("--remote-debugging-port={1}", Shell.CliEscape(this.DebugPort))
    Flags.Push(RemoteDebuggingPortFlag)

    ProfileDirectoryFlag := Format("--profile-directory=`"{1}`"", this.Profile)
    Flags.Push(ProfileDirectoryFlag)

    if (this.ProfilePath) {
      UserDataDirFlag := Format("--user-data-dir=`"{1}`"", Shell.CliEscape(this.ProfilePath))
      Flags.Push(UserDataDirFlag)
    }

    Url := Shell.CliEscape(Url)

    Flags := Flags.Join(" ")
    Command := Format("{1} {2} {3}", Target, Flags, Url)
    return Command
  }

  /*
  	Finds instances of chrome in debug mode and the ports they're running
  	on. If no instances are found, returns a false value. If one or more
  	instances are found, returns an associative array where the keys are
  	the ports, and the values are the full command line texts used to start
  	the processes.

  	One example of how this may be used would be to open chrome on a
  	different port if an instance of chrome is already open on the port
  	you wanted to used.

  	```
  	; If the wanted port is taken, use the largest taken port plus one
  	DebugPort := 9222
  	if (Chromes := Chrome.FindInstances()).HasKey(DebugPort)
  		DebugPort := Chromes.MaxIndex() + 1
  	ChromeInst := new Chrome(ProfilePath,,,, DebugPort)
  	```

  	Another use would be to scan for running instances and attach to one
  	instead of starting a new instance.

  	```
  	if (Chromes := Chrome.FindInstances())
  		ChromeInst := {"base": Chrome, "DebugPort": Chromes.MinIndex()}
  	else
  		ChromeInst := new Chrome(ProfilePath)
  	```
   */
  static FindInstances() {
    static Needle := "--remote-debugging-port=(\d+)"
    Out := Map()

    ; Get WMI service object.
    Wmi := ComObjGet("winmgmts:")
    ; Run query to retrieve matching process(es).
    Query := Wmi.ExecQuery("SELECT CommandLine"
      . " FROM Win32_Process "
      . " WHERE Name = 'chrome.exe'")
    for Item in Query {
      if RegExMatch(Item.CommandLine, Needle, &Match) {
        Out[Match.1] := Item.CommandLine
      }
    }
    return Out
  }

  /*
    Profile       - Name of the Chrome profile to use.
  	ProfilePath - Path to the user profile directory to use. Will use the standard if left blank.
  	Urls        - The page or array of pages for Chrome to load when it opens
  	Flags       - Additional flags for chrome when launching
  	ChromePath  - Path to chrome.exe, will detect from start menu when left blank
  	DebugPort   - What port should Chrome's remote debugging server run on
   */
  __New(Profile := "Default", ProfilePath := "", Urls := "about:blank", Flags := "", ChromePath := "", DebugPort := "") {
    this.Profile := Profile

    ; Verify ProfilePath
    if (ProfilePath != "" && !!!InStr(FileExist(ProfilePath), "D")) {
      throw Error("The given ProfilePath does not exist")
    }
    this.ProfilePath := ProfilePath

    ; Verify ChromePath
    if (ChromePath == "") {
      ChromePath := RegRead("HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe")
    }
    if !!!FileExist(ChromePath) {
      throw Error("Chrome could not be found")
    }
    this.ChromePath := ChromePath

    ; Verify DebugPort
    if (DebugPort != "") {
      if (!!!IsInteger(DebugPort)) {
        throw Error("DebugPort must be a positive integer")
      } else if (DebugPort <= 0) {
        throw Error("DebugPort must be a positive integer")
      }
      this.DebugPort := DebugPort
    } else {
      this.DebugPort := Chrome.DebugPort
    }

    if (Flags == "") {
      Flags := []
    } else if (IsObject(Flags) and !!!Flags.Length) {
      throw Error("Flags must be an array")
    }

    UrlString := (IsObject(Urls) ? Urls : [Urls]).Join(" ")

    Run(this.GenerateRunCommand(UrlString, Flags), , , &Pid)
    this._Pid := Pid

    if (Flags.HasVal("--headless")) {
      return
    }

    if (WinWaitActive("Google Chrome", , Chrome.WaitFor)) {
      this._Handle := WinActive("A")
    } else {
      throw Error("Chrome failed to start")
    }
  }

  Pid {
    get => this._Pid
  }

  Handle {
    get => this._Handle
  }

  /*
  	End Chrome by terminating the process.
   */
  Kill() {
    ProcessClose(this.Pid)
  }

  /*
  Opens a new tab. Responds with the websocket target data for the new tab.
   */
  static _NewPage(DebugPort, Url) {
    Http := ComObject("WinHttp.WinHttpRequest.5.1")
    Http.open("GET", "http://127.0.0.1:" DebugPort "/json/new?" Url)
    Http.send()

    Response := Http.responseText
    PageData := JXON_Load(&Response)
    return PageData
  }

  NewPage(Url := "about:blank") {
    return Chrome._NewPage(this.DebugPort, Url)
  }

  /*
  	Queries chrome for a list of pages that expose a debug interface.
  	In addition to standard tabs, these include pages such as extension
  	configuration pages.
   */
  static _GetPageList(DebugPort) {
    Http := ComObject("WinHttp.WinHttpRequest.5.1")
    Http.open("GET", "http://127.0.0.1:" DebugPort "/json")
    Http.send()

    Response := Http.responseText
    PageList := JXON_Load(&Response)
    return PageList
  }

  GetPageList() {
    return Chrome._GetPageList(this.DebugPort)
  }

  /*
  	Returns a connection to the debug interface of a page that matches the
  	provided criteria. When multiple pages match the criteria, they appear
  	ordered by how recently the pages were opened.

  	Key           - The key from the page list to search for, such as "url" or "title"
  	Value         - The value to search for in the provided key
  	MatchMode     - What kind of search to use, such as "exact", "contains", "startswith", or "regex"
  	Index         - If multiple pages match the given criteria, which one of them to return
  	EventCallback - A function to be called whenever an event occurs on the the page
  	CloseCallback - A function to be called whenever the page connection is lost
  	WaitFor       - Polling delary between next page query attempy
   */
  GetPageBy(Key, Value, MatchMode := "exact", Index := 1, EventCallback := "", CloseCallback := "", WaitFor := 100) {
    PageFound := false
    while !!!PageFound {
      Count := 0
      for n, PageData in this.GetPageList() {
        if (((MatchMode = "exact" && PageData[Key] = Value)	; Case insensitive
            || (MatchMode = "contains" && InStr(PageData[Key], Value))
            || (MatchMode = "startswith" && InStr(PageData[Key], Value) == 1)
            || (MatchMode = "regex" && PageData[Key] ~= Value))
          && ++Count == Index) {
          PageFound := true
          return Chrome.Page(PageData, this.DebugPort, EventCallback, CloseCallback)
        }
      }
      Sleep(WaitFor)
    }
  }

  /*
  	Shorthand for GetPageBy("url", Value, "startswith")
   */
  GetPageByUrl(Value, MatchMode := "contains", Index := 1, EventCallback := "", CloseCallback := "") {
    return this.GetPageBy("url", Value, MatchMode, Index, EventCallback, CloseCallback)
  }

  /*
  	Shorthand for GetPageBy("title", Value, "startswith")
   */
  GetPageByTitle(Value, MatchMode := "contains", Index := 1, EventCallback := "", CloseCallback := "") {
    return this.GetPageBy("title", Value, MatchMode, Index, EventCallback, CloseCallback)
  }

  /*
  	Shorthand for GetPageBy("type", Type, "exact")

  	The default type to search for is "page", which is the visible area of
  	a normal Chrome tab.
   */
  GetPage(Index := 1, Type := "page", EventCallback := "", CloseCallback := "") {
    return this.GetPageBy("type", Type, "exact", Index, EventCallback, CloseCallback)
  }

  /*
  	Connects to the debug interface of a page given its WebSocket Url.
   */
  class Page {
    Connected := False
    Id := 0
    Responses := Map()
    static TabGroupColors := {
      White: 1,
      Blue: 2,
      Red: 3,
      Yellow: 4,
      Green: 5,
      Pink: 6,
      Purple: 7,
      Teal: 8
    }
    static TabGroupColorsInUse := Map(
      Chrome.Page.TabGroupColors.White, 0,
      Chrome.Page.TabGroupColors.Blue, 0,
      Chrome.Page.TabGroupColors.Red, 0,
      Chrome.Page.TabGroupColors.Yellow, 0,
      Chrome.Page.TabGroupColors.Green, 0,
      Chrome.Page.TabGroupColors.Pink, 0,
      Chrome.Page.TabGroupColors.Purple, 0,
      Chrome.Page.TabGroupColors.Teal, 0
    )

    /*
    	PageData      - Client data for the page (see https://chromedevtools.github.io/devtools-protocol/#endpoints for more information)
    	DebugPort     - The port Chrome's remote debugging server is running on
    EventCallback - A function to be called whenever message is received
    	CloseCallback - A function to be called whenever the page connection is lost
     */
    __New(PageData, DebugPort, EventCallback := "", CloseCallback := "") {
      this.PageData := PageData
      this.DebugPort := DebugPort
      this.EventCallback := EventCallback
      this.CloseCallback := CloseCallback
      this.Color := Chrome.Page.TabGroupColors.White

      this.BoundKeepAlive := this.Call.Bind(this, "Browser.getVersion", , False)

      WebSocketUrl := StrReplace(PageData["webSocketDebuggerUrl"], "localhost", "127.0.0.1")
      this.ws := { base: WebSocket.Prototype, _Event: this.Event, Parent: this }
      this.ws.__New(WebSocketUrl)

      while !!!this.Connected {
        Sleep(50)
      }
    }

    /*
    	Calls the specified endpoint and provides it with the given
    	parameters.

    	DomainAndMethod - The endpoint domain and method name for the
    		endpoint you would like to call. For example:
    		PageInst.Call("Browser.close")
    		PageInst.Call("Schema.getDomains")

    	Params - An associative array of parameters to be provided to the
    		endpoint. For example:
    		PageInst.Call("Page.printToPDF", {"scale": 0.5 ; Numeric Value
    			, "landscape": Chrome.Jxon_True() ; Boolean Value
    			, "pageRanges: "1-5, 8, 11-13"}) ; String value
    		PageInst.Call("Page.navigate", {"url": "https://autohotkey.com/"})

    	WaitForResponse - Whether to block until a response is received from
    		Chrome, which is necessary to receive a return value, or whether
    		to continue on with the script without waiting for a response.
     */
    Call(DomainAndMethod, Params := "", WaitForResponse := true) {
      if (!!!this.Connected) {
        throw Error("Not connected to tab")
      }

      ; Use a temporary variable for Id in case more calls are made
      ; before we receive a response.
      Id := this.Id += 1
      Payload := Map("id", Id, "method", DomainAndMethod)
      if (Params) {
        Payload["params"] := Params
      }
      this.ws.Send(JXON_Dump(Payload))

      if (!!!WaitForResponse) {
        return
      }

      ; Wait for the response
      this.Responses[Id] := False
      while (!!!this.Responses[Id]) {
        Sleep(Delay.Fast)
      }

      ; Get the response, check if it's an error
      Response := this.Responses.Delete(Id)
      if (Response.Has("error")) {
        throw Error(JXON_Dump(Response))
      }

      return Response.Get("result")
    }

    /*
    	Run some JavaScript on the page. For example:

    	PageInst.Evaluate("alert(""I can't believe it's not IE!"");")
    	PageInst.Evaluate("document.getElementsByTagName('button')[0].click();")
     */
    Evaluate(JS := "") {
      Payload := Map("expression", JS, "objectGroup", "console")
      Response := this.Call("Runtime.evaluate", Payload)

      if (response.Has("exceptionDetails")) {
        throw Error(response.Get("result").Get("description")
          , -1
          , JXON_Dump(Map("Code", JS, "exceptionDetails", response.Get("exceptionDetails"))))
      }

      return response.Get("result")
    }

    /*
    	Internal function triggered when the script receives a message on
    	the WebSocket connected to the page.
     */
    Event(EventName, Event) {
      ; If it was called from the WebSocket adjust the class context
      if (this.Parent) {
        this := this.Parent
      }

      switch (EventName) {
        case "Open":
          this.Connected := true
          BoundKeepAlive := this.BoundKeepAlive
          SetTimer(BoundKeepAlive, Delay.Sluggish)
        case "Message":
          EventData := Event.data
          data := JXON_Load(&EventData)

          ; Run the callback routine
          ; if (this.EventCallback(data)) {
          ;   data := this.EventCallback(data)
          ; }

          if (this.Responses.Has(data["id"])) {
            this.Responses[data["id"]] := data
          }
        case "Close":
          this.Disconnect()
        case "Error":
          throw Error("WebSocket Error", , Event)
      }
    }

    /*
    	Disconnect from the page's debug interface, allowing the instance
    	to be garbage collected.

    	This method should always be called when you are finished with a
    	page or else your script will leak memory.
     */
    Disconnect() {
      if (!!!this.Connected) {
        return
      }

      ; Discounnect the WebSocket
      this.Connected := False
      this.ws.Disconnect()
      this.ws.DeleteProp("Parent")

      ; Close the `BoundKeepAlive` timer
      BoundKeepAlive := this.BoundKeepAlive
      SetTimer(BoundKeepAlive, 0)
      this.DeleteProp("BoundKeepAlive")
    }

    /*
    	Waits for the page's readyState to match the DesiredState.

    	DesiredState - The state to wait for the page's ReadyState to match
    	Interval     - How often it should check whether the state matches
     */
    WaitForLoad(DesiredState := "complete", Interval := 200) {
      while this.Evaluate("document.readyState")["value"] != DesiredState {
        Sleep(Interval)
      }
    }

    /*
    	Returns the page's current window id.
     */
    GetWindowId() {
      PageId := this.PageData["id"]
      Response := this.Call("Browser.getWindowForTarget", Map("targetId", PageId))
      return Response["windowId"]
    }

    /*
    Set the state of the browser window.
     */
    SetWindowState(State) {
      this.Call(
        "Browser.setWindowBounds",
        Map(
          "windowId", this.GetWindowId(),
          "bounds", Map(
            "windowState", State
          )
        )
      )
    }

    /*
    Maximize the browser window.
     */
    Maximize() {
      this.SetWindowState("maximized")
    }

    /*
    Minimize the browser window.
     */
    Minimize() {
      this.SetWindowState("minimize")
    }

    /*
    Normalize the browser window.
     */
    Normalize() {
      this.SetWindowState("normal")
    }

    /*
    Fullscreen the browser window.
     */
    Fullscreen() {
      this.SetWindowState("fullscreen")
    }

    /*
    	Navigate to the provided url and wait for the page to load.
     */
    Navigate(Url) {
      this.Call("Page.navigate", Map("url", Url))
      this.WaitForLoad()
    }

    /*
    Opens a new page in the current window. Responds with the websocket
    target data for the new tab.
     */
    NewTab(Url := "about:blank") {
      TabData := Chrome._NewPage(this.DebugPort, Url)
      Tab := Chrome.Page(TabData, this.DebugPort)
      Tab.WaitForLoad()
      return Tab
    }

    /*
    Brings page to front (activates tab).
     */
    Activate() {
      this.Call("Page.bringToFront")
    }

    /*
    Tries to close page, running its beforeunload hooks, if any.
     */
    Close() {
      this.Call("Page.close")
    }

    /*
    * Create a new tab group an populate with provided urls.
     */
    NewTabGroupWithUrls(GroupName, Urls, Color, Minimize := false) {
      Tab := this.NewTab(Urls.RemoveAt(1))
      Tab.NewTabGroup(GroupName, Color)
      Sleep(Delay.Fast)

      for (Url in Urls) {
        _Tab := this.NewTabInGroup(Url)
        _Tab.Disconnect()
      }

      if (Minimize) {
        Tab.Activate()
        Sleep(Delay.Fast)
        Chrome.FocusTab()
        ; Minimize the tab group
        Send("{Left}")
        Send("{Enter}")
      }

      Tab.Disconnect()
    }

    /*
    Mimic the tab group color selection behavior.

    Chrome chooses an inital selection index for the tab group color
    selection radio based on the tab group colors that already exist in
    the window. Chrome will default to the left-most radio index relative
    to the current `count floor`. See below for a geometric example that
    should help create a mental model of the selection logic.

    [*] - Next tab group default color selection
    [W] = Tab group (colored white)
    [B] = Tab group (colored blue)
    [R] = Tab group (colored red)
    [Y] = Tab group (colored yellow)
    [G] = Tab group (colored green)
    [P] = Tab group (colored pink)
    [P] = Tab group (colored purple)
    [T] = Tab group (colored teal)

    ------------------------------
    | [ ] [ ] [ ] [ ] [ ] [ ] [ ] |
    | [W] [ ] [ ] [ ] [ ] [ ] [ ] |
    | [W] [ ] [ ] [ ] [ ] [ ] [ ] |
    | [W] [B] [ ] [ ] [ ] [ ] [T] |
    | [W] [B] [*] [Y] [ ] [ ] [T] | <-- count floor
    | [W] [B] [R] [Y] [G] [P] [T] |
    ------------------------------

    In the above example, the tab group color selection would auto-focus
    the `Red` radio button. After determining the index of the next selection,
    we can calculate a desired selection by finding the difference in indices.
     */
    static GetSelectedTabColorIndex() {
      SelectedTabColorIndex := Chrome.Page.TabGroupColors.White

      ; Get the lowest count level indicated by the `TabGroupColorsInUse`
      ; map.
      LowestCount := -1
      for (_, Count in Chrome.Page.TabGroupColorsInUse) {
        if (LowestCount == -1 || Count < LowestCount) {
          LowestCount := Count
        }
      }

      ; Generate an array `LowestLevelColors` of colors whose current
      ; count in `TabGroupColorsInUse` matches `LowestCount`. We want to
      ; Exclude any colors that have counters larger than the floor.
      LowestLevelColors := []
      for (Color, Count in Chrome.Page.TabGroupColorsInUse) {
        if (Count == LowestCount) {
          LowestLevelColors.Push(Color)
        }
      }

      ; Set `LowestColor` to the lowest recorded color in the `LowestLevelColors`
      ; array.
      LowestColor := -1
      for (Color in LowestLevelColors) {
        if (LowestColor == -1 || Color < LowestColor) {
          LowestColor := Color
        }
      }

      SelectedTabColorIndex := LowestColor
      return SelectedTabColorIndex
    }

    /*
    Create a new tab group for the tab with the corresponding Id.
     */
    NewTabGroup(GroupName, Color := 1) {
      this.Color := Color

      Chrome.FocusTab()
      Chrome.OpenSelectionMenu()

      Url := this.PageData["url"]
      ; New tabs without an active website url are not able to be added to the user's
      ; reading list, and thus the `Add tab to reading list` option is not available.
      ; When this is the case, we need to navigate down the tab selection dropdown by
      ; one less selection.
      if (Url == "about:blank" || Url == "chrome:newtab") {
        Send("{Down 2}")
      } else {
        Send("{Down 3}")
      }

      ; Because chrome modifies the dropdown selection UI depenening on whether or not
      ; a tab group already exists, we utilize a preceding `{Right}` input to attempt
      ; to open the dropdown (which only exists if a tab group already exists).
      Send("{Right}{Enter}")
      Send("{Raw}" . GroupName)

      ; Focus the color selection radio
      Send("{Tab}")

      ; Get the index of the active color radio selection
      SelectedTabColorIndex := Chrome.Page.GetSelectedTabColorIndex()

      ; Update the map of tab group colors in use
      Chrome.Page.TabGroupColorsInUse[Color] += 1

      ; Calculate the traversal offset for the color radio selection
      ColorDistance := Color - SelectedTabColorIndex
      if (ColorDistance > 0) {
        Send(Format("{Right {1}}", ColorDistance))
      } else if (ColorDistance < 0) {
        Send(Format("{Left {1}}", -ColorDistance))
      }

      ; Select the color
      Send("{Enter}")

      ; Exit the tab group menu
      Send("{Esc}")
    }

    /*
    Create a new tab in the tab group of the tab with the corresponding Id. The Provided
    tab Id must correspond to the first tab in the group.
     */
    NewTabInGroup(Url) {
      Tab := this.NewTab(Url)
      Sleep(Delay.Fast)
      Chrome.FocusTab()
      ; Move the created tab into the group
      Chrome.MoveTabSelectionLeft()
      return Tab
    }
  }

  ; ================================
  ; === Tab and Window Shortcuts ===
  ; ================================

  ; Open a new window
  static OpenNewWindow() {
    Send("^n")
  }

  ; Open a new window in Incognito mode
  static OpenNewIncognitoWindow() {
    Send("^+n")
  }

  ; Open a new tab, and jump to it
  static OpenNewTab() {
    Send("^t")
  }

  ; Reopen previously closed tabs in the order they were closed
  static OpenClosedTab() {
    Send("^+t")
  }

  ; Jump to the next open tab
  static JumpToNextTab() {
    Send("^{Tab}")
  }

  ; Jump to the previous open tab
  static JumpToPreviousTab() {
    Send("^+{Tab}")
  }

  ; Jump to a specific tab. `Index` must be in a range from 1 - 8.
  static JumpToTab(Index) {
    if (Index > 8 || Index < 1) {
      throw Error("Index must be in a range from 1 - 8.")
    }
    Send(Format("^{1}", Index))
  }

  ; Jump to the rightmost tab
  static JumpToTrailingTab() {
    Send("^9")
  }

  ; Open the previous page from your browsing history in the current tab
  static OpenPreviousPageFromHistoryInTab() {
    Send("!{Left}")
  }

  ; Open the next page from your browsing history in the current tab
  static OpenNextPageFromHistoryInTab() {
    Send("!{Right}")
  }

  ; Close the current tab
  static CloseTab() {
    Send("^w")
  }

  ; Close the current window
  static CloseWindow() {
    Send("^+w")
  }

  ; Minimize the current window
  static MinimizeWindow() {
    Send("!&{Space}n")
  }

  ; Maximize the current window
  static MaximizeWindow() {
    Send("!&{Space}x")
  }

  ; Quit Google Chrome
  static Quit() {
    Send("!&fx")
  }

  ; Select the current tab.
  static FocusTab() {
    ; A standalone hotkey to jump to the tab selection doesn't yet exist.
    ; To arrive their deterministicly, we first reset the client's focus
    ; to the address bar, then cycle client focus once to focus the tab
    ; selection.
    Chrome.JumpToAddressBar()
    Chrome.CycleFocus()
  }

  ; Set focus on the first item in the Chrome tab selection
  static JumpToLeadingaTabSelectionItem() {
    Send("{Home}")
  }

  ; Set focus on the rightmost item in the Chrome selection
  static JumpToTrailingTabSelectionItem() {
    Send("{End}")
  }

  ; Move tab or tab group right when focused
  static MoveTabSelectionRight() {
    Send("^{Right}")
  }

  ; Move tab or tab group leftr when focused
  static MoveTabSelectionLeft() {
    Send("^{Left}")
  }

  ; Move tab or tab group to the beginning of the stack
  static MoveTabSelectionToStart() {
    Send("^+{Left}")
  }

  ; Move tab or tab group to the end of the stack
  static MoveTabSelectionToEnd() {
    Send("^+{Right}")
  }

  ; =======================================
  ; === Google Chrome Feature Shortcuts ===
  ; =======================================

  ; Open the Chrome menu
  static OpenMenu() {
    Send("!f")
  }

  ; Show or hide the Bookmarks bar
  static ToggleBookmarksBar() {
    Send("^+b")
  }

  ; Open the Bookmarks Manager
  static OpenBookmarksManager() {
    Send("^+o")
  }

  ; Open the History page in a new tab
  static OpenHistoryPageInNewTab() {
    Send("^h")
  }

  ; Open the Downloads page in a new tab
  static OpenDownloadsPageInNewTab() {
    Send("^j")
  }

  ; Open the Chrome Task Manager
  static OpenTaskManager() {
    Send("+{Escape}")
  }

  ; Set focus on the first item in the Chrome toolbar
  static JumpToLeadingToolbarItem() {
    Send("+!t")
  }

  ; Set focus on the rightmost item in the Chrome toolbar
  static JumpToTrailingToolbarItem() {
    Send("{F10}")
  }

  ; Switch focus to unfocused dialog (if showing) and all toolbars
  static CycleFocus() {
    Send("{F6}")
  }

  ; Open selection settings (similar to a right click)
  static OpenSelectionMenu() {
    Send("+{F10}")
  }

  ; Open the Find Bar to search the current page
  static OpenFindBar() {
    Send("^f")
  }

  ; Jump to the next match to your Find Bar search
  static JumpToNextFindMatch() {
    Send("^g")
  }

  ; Jump to the previous match to your Find Bar search
  static JumpToPreviousFindMatch() {
    Send("^+g")
  }

  ; Open Developer Tools
  static OpenDeveloperTools() {
    Send("^+{F12}")
  }

  ; Open the Clear Browsing Data options
  static OpenClearBrowsingData() {
    Send("^+{Delete}")
  }

  ; Open Chrome profile selection
  static OpenProfilesSelection() {
    Send("^+m")
  }

  ; Open a feedback form
  static OpenFeedbackForm() {
    Send("!+i")
  }

  ; Turn on caret browsing
  static ToggleCaretBrowsing() {
    Send("{F7}")
  }

  ; Focus web page contents
  static FocusWebPage() {
    Send("^{F6}")
  }

  ; =============================
  ; === Address Bar Shortcuts ===
  ; =============================

  ; Search with your default search engine
  Search(Query) {
    Send(Format("{Raw}{1}", Query))
    Send("{Enter}")
  }

  ; Search using a different search engine
  SearchWithEngine(Engine, Query) {
    Send(Format("{Raw}{1}", Query))
    Send("{Tab}")
    Chrome.Search(Query)
  }

  ; Open a new tab and perform a Google search
  SearchAndOpenNewTab(Query) {
    Send(Format("{Raw}{1}", Query))
    Send("!{Enter}")
  }

  ; Jump to the address bar
  static JumpToAddressBar() {
    Send("^l")
  }

  ; Search from anywhere on the page
  SearchOnPage(Query) {
    Send("^k")
    Chrome.Search(Query)
  }

  ; =========================
  ; === Webpage Shortcuts ===
  ; =========================

  ; Open options to print the current page
  static Print() {
    Send("^p")
  }

  ; Open options to save the current page
  static Save() {
    Send("^s")
  }

  ; Reload the current page
  static Reload() {
    Send("^r")
  }

  ; Reload the current page, ignoring cached content
  static ReloadWithNoCache() {
    Send("^+r")
  }

  ; Stop the page loading
  static Stop() {
    Send("{Esc}")
  }

  ; Browse clickable items moving forward
  static BrowseNext() {
    Send("{Tab}")
  }

  ; Browse clickable items moving backward
  static BrowsePrevious() {
    Send("+{Tab}")
  }

  ; Open a file from your computer in Chrome
  static OpenFile() {
    Send("^o")
  }

  ; Display non-editable HTML source code for the current page
  static PageSource() {
    Send("^u")
  }

  ; Save your current webpage as a bookmark
  static Bookmark() {
    Send("^d")
  }

  ; Save all open tabs as bookmarks in a new folder
  static BookmarkAll() {
    Send("^+d")
  }

  ; Turn full-screen mode on or off
  static ToggleFullscreen() {
    Send("{F11}")
  }

  ; Make everything on the page bigger
  static ZoomIn() {
    Send("^+")
  }

  ; Make everything on the page smaller
  static ZoomOut() {
    Send("^-")
  }

  ; Return everything on the page to default size
  static ResetZoom() {
    Send("^0")
  }

  ; Scroll down a webpage, a screen at a time
  static ScrollDown() {
    Send("{PgDn}")
  }

  ; Scroll up a webpage, a screen at a time
  static ScrollUp() {
    Send("{PgUp}")
  }

  ; Go to the top of the page
  static ScrollToTop() {
    Send("{Home}")
  }

  ; Go to the bottom of the page
  static ScrollToBottom() {
    Send("{End}")
  }
}
