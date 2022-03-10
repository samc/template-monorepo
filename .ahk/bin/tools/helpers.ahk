SetupTools(Desktop) {
  SetKeyDelay(0)
  ResetFocus()

  ; Go to virtual desktop
  GoToDesktop(Desktop.Index)
  ResetFocus()

  ; Open pages
  if (Desktop.HasProp("Pages") && Desktop.Pages.Length) {
    OpenPages(Desktop.Pages)
    ResetFocus()
  }

  ; Open applications
  if (Desktop.HasProp("Applications") && Desktop.Applications.Length) {
    OpenApplications(Desktop.Applications)
    ResetFocus()
  }
  return
}

/*
 * Open all applications
 */
OpenApplications(Applications) {
  for Application in Applications {
    OpenApplication(Application)
  }
}

/*
 * Open a single application
 */
OpenApplication(Settings) {
  ; Sleep if designated
  if (Settings.HasProp("SleepBefore") && Settings.SleepBefore) {
    Sleep(Settings.SleepBefore)
  }

  ; Assemble application runnable command
  Command := Settings.Executable
  if (Settings.HasProp("Arguments") && Settings.Arguments.Length) {
    ; Assemble application command-line arguments
    Arguments := Settings.Arguments.Join(" ")
    Command := Command " " Arguments
  }
  if (Settings.HasProp("Target")) {
    Command := Command " " Settings.Target
  }

  ; Open application
  local Pid
  Run(Command, , , &Pid)

  ; Wait for application to open
  local Title := Pid
  local Exclude := ""
  if (Settings.HasProp("TitleMatch") && Settings.TitleMatch != "") {
    Title := Settings.TitleMatch
  }
  if (Settings.HasProp("TitleExclude") && Settings.TitleExclude != "") {
    Exclude := Settings.TitleExclude
  }
  Pid := WinWait(Title, , , Exclude)

  ; Make sure the application is active
  WinActivate(Pid)

  ; Move window to designated FancyZone position
  if (Settings.HasProp("Position")) {
    MoveWindowToFancyZone(Settings.Position, Pid)
  }

  ; Sleep if designated
  if (Settings.HasProp("SleepAfter") && Settings.SleepAfter) {
    Sleep(Settings.SleepAfter)
  }

  ; Input after-the-fact send command if it exists
  if (Settings.HasProp("InputAfter") && Settings.InputAfter != "") {
    Send(Settings.InputAfter)
    Send("{Enter}")
  }
}

/*
 * Open all pages
 */
OpenPages(Pages) {
  for Page in Pages {
    if (Page.HasProp("Groups") && Page.Groups.Length) {
      OpenPageWithGroups(Page)
    } else if (Page.HasProp("Url") && Page.Url != "") {
      OpenPage(Page)
    }
  }
}

/*
 * Open a new Chrome window with the given tab groups
 */
OpenPageWithGroups(Settings) {
  ; Create a new Chrome window
  Window := Chrome(Settings.Profile, , , ["--new-window"])

  ; Get the page instance
  Page := Window.GetPageByUrl("about:blank")
  Page.Navigate("chrome:newtab")

  ; Maxinize the window
  Page.Maximize()

  ; Open tab groups on the page
  for Group in Settings.Groups {
    Page.NewTabGroupWithUrls(Group.Name, Group.Urls, Group.Color, true)
  }

  ; Move the initial tab to the end of the new stack
  Chrome.FocusTab()
  Chrome.MoveTabSelectionToEnd()
  Chrome.FocusWebPage()

  ; Disconnect from page instance
  Page.Disconnect()

  ; Move window to designated FancyZone position
  if (Settings.HasProp("Position")) {
    MoveWindowToFancyZone(Settings.Position)
  }
}

/*
 * Open a new Chrome window with the designated url
 */
OpenPage(Settings) {
  ; Create a new Chrome window
  Window := Chrome(Settings.Profile, , , ["--new-window"])

  ; Get the page instance
  Page := Window.GetPageByUrl("about:blank")
  Page.Navigate(Settings.Url)

  ; Disconnect from page instance
  Page.Disconnect()

  ; Move window to designated FancyZone position
  if (Settings.HasProp("Position")) {
    MoveWindowToFancyZone(Settings.Position)
  }
}

/*
 * Focus the Windows Virutal Desktop that corresponds to the provided index
 */
GoToDesktop(Index) {
  Send(Format("^#{1}", Index))
  Sleep(Delay.Default)
}

/*
 * Move active window to the provided FancyZone position
 */
MoveWindowToFancyZone(Position, Title := "A") {
  ; Maximize window to reset FancyZone position
  WinMaximize(Title)

  ; Some windows handle maximizing differently, and can lose focus after maximizing. So we activate
  ; the window again to ensure it is focused.
  WinActivate(Title)

  ; We use the center-most FancyZone as a default relative position
  Send("#{Up}")
  if (Position != "" && Position != "Center") {
    Send(Format("#{{1}}", Position))
  }
}

/*
 * Get WSL file path
 */
GetWslFilePath(FilePath) {
  FilePath := Shell.CliEscape(FilePath)
  return Format("`"/home/sam/{1}`"", FilePath)
}

/*
 * Get Windows file path
 */
GetWindowsFilePath(FilePath, Options := "") {
  UserName := EnvGet("USERNAME")
  FilePath := Shell.CliEscape(FilePath)
  return Format("`"C:\Users\{1}\{2}`"", UserName, FilePath)
}

/*
 * Set the active focus to the Windows taskbar
 */
ResetFocus() {
  WinActivate("ahk_class Shell_TrayWnd")
  WinWaitActive("ahk_class Shell_TrayWnd", , 1)
  MouseMove(0, 0)
}
