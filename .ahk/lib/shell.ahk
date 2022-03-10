class Shell {
  /*
  	Escape a string in a manner suitable for command line parameters
   */
  static CliEscape(Param) {
    return RegExReplace(Param, "(\\*)", "$1")
  }

  /*
  	Append a WSL shell execution prefix to the following command
   */
  static WslCommand(Command) {
    return Format("wsl source ~/.profile; {1}", Command)
  }
}