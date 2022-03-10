; -===========================================================================-
; -===[Tab and Window Shortcuts]==============================================-
; -===========================================================================-

; Open a new window
OpenNewWindow() {
  Send("^n")
}

; Open a new window in Incognito mode
OpenNewIncognitoWindow() {
  Send("^+n")
}

; Open a new tab, and jump to it
OpenNewTab() {
  Send("^t")
}

; Reopen previously closed tabs in the order they were closed
OpenClosedTab() {
  Send("^+t")
}

; Jump to the next open tab
JumpToNextTab() {
  Send("^{Tab}")
}

; Jump to the previous open tab
JumpToPreviousTab() {
  Send("^+{Tab}")
}

; Jump to a specific tab. `Index` must be in a range from 1 - 8.
JumpToTab(Index) {
  if (Index > 8 || Index < 1) {
    throw new Error("Index must be in a range from 1 - 8.")
  }
  Send(Format("^{1}", Name))
}

; Jump to the rightmost tab
JumpToTrailingTab() {
  Send("^9")
}

; Open the previous page from your browsing history in the current tab
OpenPreviousPageFromHistoryInTab() {
  Send("!{Left}")
}

; Open the next page from your browsing history in the current tab
OpenNextPageFromHistoryInTab() {
  Send("!{Right}")
}

; Close the current tab
CloseTab() {
  Send("^w")
}

; Close the current window
CloseWindow() {
  Send("^+w")
}

; Minimize the current window
MinimizeWindow() {
  Send("!&{Space}n")
}

; Maximize the current window
MaximizeWindow() {
  Send("!&{Space}x")
}

; Quit Google Chrome
Quit() {
  Send("!&fx")
}

; Jump to tab focused selection.
JumpToTabSelection() {
  ; A standalone hotkey to jump to the tab selection doesn't yet exist.
  ; To arrive their deterministicly, we first reset the client's focus
  ; to the web page, then cycle client focus twice to focus the tab
  ; selection.
  FocusWebPage()
  CycleFocus()
  CycleFocus()
}

; Set focus on the first item in the Chrome tab selection
JumpToLeadingaTabSelectionItem() {
  Send("{Home}")
}

; Set focus on the rightmost item in the Chrome selection
JumpToTrailingTabSelectionItem() {
  Send("{End}")
}

; Move tab or tab group right when focused
MoveTabSelectionRight() {
  Send("^{Right}")
}

; Move tab or tab group leftr when focused
MoveTabSelectionLeft() {
  Send("^{Left}")
}

; Add the selected tab to a new tab group
AddTabToNewTabGroup(Name) {
  Send("+{F10}")
  ; New tabs without an active website are not able to be added to the user's
  ; reading list, and thus the `Add tab to reading list` option is not available.
  ; When this is the case, we need to navigate down the tab selection dropdown differently
  ; to arrive at the `Add tab to group` selection.
  ;
  ; To work around this, we'll use the active Chrome window's current title and look for
  ; the presence of `New Tab` to determine if the tab is a new tab.
  Title := WinGetTitle("A")
  if (Title contains "New Tab") {
    Send("{Down 2}")
  } else {
    Send("{Down 3}")
  }

  ; Because chrome modifies the dropdown selection UI depenening on whether or not
  ; a tab group already exists, we need to utilize clipboard input in order to not
  ; trigger a keyboard input, which will automatically focus the address bar. The
  ; following loop will address both UI states.
  Clipboard := Name
  Send("^c")
  loop (2) {
    Send("{Enter}")
    end("^v")
  }
}

; =======================================
; === Google Chrome Feature Shortcuts ===
; =======================================

; Open the Chrome menu
OpenMenu() {
  Send("!f")
}

; Show or hide the Bookmarks bar
ToggleBookmarksBar() {
  Send("^+b")
}

; Open the Bookmarks Manager
OpenBookmarksManager() {
  Send("^+o")
}

; Open the History page in a new tab
OpenHistoryPageInNewTab() {
  Send("^h")
}

; Open the Downloads page in a new tab
OpenDownloadsPageInNewTab() {
  Send("^j")
}

; Open the Chrome Task Manager
OpenTaskManager() {
  Send("+{Escape}")
}

; Set focus on the first item in the Chrome toolbar
JumpToLeadingToolbarItem() {
  Send("+!t")
}

; Set focus on the rightmost item in the Chrome toolbar
JumpToTrailingToolbarItem() {
  Send("{F10}")
}

; Switch focus to unfocused dialog (if showing) and all toolbars
CycleFocus() {
  Send("{F6}")
}

; Open the Find Bar to search the current page
OpenFindBar() {
  Send("^f")
}

; Jump to the next match to your Find Bar search
JumpToNextFindMatch() {
  Send("^g")
}

; Jump to the previous match to your Find Bar search
JumpToPreviousFindMatch() {
  Send("^+g")
}

; Open Developer Tools
OpenDeveloperTools() {
  Send("^+{F12}")
}

; Open the Clear Browsing Data options
OpenClearBrowsingData() {
  Send("^+{Delete}")
}

; Open Chrome profile selection
OpenProfilesSelection() {
  Send("^+m")
}

; Open a feedback form
OpenFeedbackForm() {
  Send("!+i")
}

; Turn on caret browsing
ToggleCaretBrowsing() {
  Send("{F7}")
}

; Focus web page contents
FocusWebPage() {
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
  Search(Query)
}

; Open a new tab and perform a Google search
SearchAndOpenNewTab(Query) {
  Send(Format("{Raw}{1}", Query))
  Send("!{Enter}")
}

; Jump to the address bar
JumpToAddressBar() {
  Send("^l")
}

; Search from anywhere on the page
SearchOnPage(Query) {
  Send("^k")
  Search(Query)
}

; =========================
; === Webpage Shortcuts ===
; =========================

; Open options to print the current page
Print() {
  Send("^p")
}

; Open options to save the current page
Save() {
  Send("^s")
}

; Reload the current page
Reload() {
  Send("^r")
}

; Reload the current page, ignoring cached content
ReloadWithNoCache() {
  Send("^+r")
}

; Stop the page loading
Stop() {
  Send("{Esc}")
}

; Browse clickable items moving forward
BrowseNext() {
  Send("{Tab}")
}

; Browse clickable items moving backward
BrowsePrevious() {
  Send("+{Tab}")
}

; Open a file from your computer in Chrome
OpenFile() {
  Send("^o")
}

; Display non-editable HTML source code for the current page
PageSource() {
  Send("^u")
}

; Save your current webpage as a bookmark
Bookmark() {
  Send("^d")
}

; Save all open tabs as bookmarks in a new folder
BookmarkAll() {
  Send("^+d")
}

; Turn full-screen mode on or off
ToggleFullscreen() {
  Send("{F11}")
}

; Make everything on the page bigger
ZoomIn() {
  Send("^+")
}

; Make everything on the page smaller
ZoomOut() {
  Send("^-")
}

; Return everything on the page to default size
ResetZoom() {
  Send("^0")
}

; Scroll down a webpage, a screen at a time
ScrollDown() {
  Send("{PgDn}")
}

; Scroll up a webpage, a screen at a time
ScrollUp() {
  Send("{PgUp}")
}

; Go to the top of the page
ScrollToTop() {
  Send("{Home}")
}

; Go to the bottom of the page
ScrollToBottom() {
  Send("{End}")
}

; ===========================
; === Tab Group Shortcuts ===
; ===========================