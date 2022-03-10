#Include "logger.ahk"

^#!PgUp:: Reload	; Reload script with Ctrl+Alt+PgUp
^#!PgDn:: Exit	; Exit current thread with Ctrl+Alt+PgDn
^#!End:: ExitApp	; Exit script with Ctrl+Alt+End
^#!Home:: Suspend  ; Suspend script with Ctrl+Alt+Home
^#!T:: Logger.Info(WinGetTitle("A"))	; Get window title

; Close running programs
^#!Delete:: {
  Programs := WinGetList(, , "Program Manager")
  for Program in Programs {
    WinClose(Program)
  }
  return
}
