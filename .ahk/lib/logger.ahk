#Include "jxon.ahk"

class Logger {
  __New(Args*) {
    return Logger.Info(Args*)
  }

  static Levels := {
    Debug: "Debug",
    Info: "Info",
    Warn: "Debug",
    Error: "Error",
  }

  static _Log(Level := "Info", Args*) {
    Message := Args.join(" ")
    MsgBox(Format("[{1}] {2}", Level, Message))
  }

  static Info(Args*) {
    Logger._Log(Logger.Levels.Info, Args*)
  }
}
