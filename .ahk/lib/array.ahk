Array.Prototype.DefineProp("Join", { Call: Join })
Join(_Array, Separator) {
  local Str := ""
  for _, Item in _Array {
    Str .= Format("{1}{2}", Item, Separator)
  }
  return SubStr(Str, 1, StrLen(Str) - StrLen(Separator))
}

Array.Prototype.DefineProp("HasVal", { Call: HasVal })
HasVal(_Array, Needle) {
  if (_Array.Length == 0) {
    return 0
  }

  for (Index, Value in _Array) {
    if (Value == Needle) {
      return Index
    }
  }
  
  return 0
}