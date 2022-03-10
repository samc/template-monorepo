class WebSocket {
  __New(wsurl) {
    static wb

    ; Create an IE instance

    this.Gui := Gui()
    Wb := this.Gui.Add("ActiveX", "xm w980 h640", "Shell.Explorer").Value
    this.handle := this.Gui.Hwnd

    ; Write an appropriate document
    Wb.Navigate("about:<!DOCTYPE html><meta http-equiv='X-UA-Compatible'"
      . "content='IE=edge'><body></body>")
    while (Wb.ReadyState < 4) {
      sleep(50)
    }
    this.document := Wb.document

    ; Add our handlers to the JavaScript namespace
    this.document.parentWindow.ahk_event := this._Event.Bind(this)
    this.document.parentWindow.ahk_ws_url := wsurl

    ; Add some JavaScript to the page to open a socket
    Script := this.document.createElement("script")
    Script.text := "ws = new WebSocket(ahk_ws_url);`n"
      . "ws.onopen = function(event){ ahk_event('Open', event); };`n"
      . "ws.onclose = function(event){ ahk_event('Close', event); };`n"
      . "ws.onerror = function(event){ ahk_event('Error', event); };`n"
      . "ws.onmessage = function(event){ ahk_event('Message', event); };"
    this.document.body.appendChild(Script)
  }

  ; Called by the JS in response to WS events
  _Event(EventName, Event) {
    this["On" EventName](Event)
  }

  ; Sends data through the WebSocket
  Send(Data) {
    this.document.parentWindow.ws.send(Data)
  }

  ; Closes the WebSocket connection
  Close(Code := 1000, Reason := "") {
    this.document.parentWindow.ws.close(Code, Reason)
  }

  ; Closes and deletes the WebSocket, removing
  ; references so the class can be garbage collected
  Disconnect() {
    if (this.handle) {
      this.Close()
      this.Gui.Destroy()
      this.handle := False
    }
  }
}