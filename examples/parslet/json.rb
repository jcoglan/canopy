class ParsletJson < Parslet::Parser
  root(:document)

  rule(:document) { sp >> (object | array) >> sp }

  rule(:object)   { str("{") >> pair >> (str(",") >> pair).repeat(0) >> str("}") | str("{") >> sp >> str("}") }

  rule(:pair)     { sp >> string >> sp >> str(":") >> value }

  rule(:array)    { str("[") >> value >> (str(",") >> value).repeat(0) >> str("]") | str("[") >> sp >> str("]") }

  rule(:value)    { sp >> (object | array | string | number | boolean | null) >> sp }

  rule(:string)   { str('"') >> (str("\\") >> any | match('[^"]')).repeat(0) >> str('"') }

  rule(:number)   { str("-").maybe >> (str("0") | match("[1-9]") >> match("[0-9]").repeat(0)) >>
                                      (str(".") >> match("[0-9]").repeat(1)).maybe >>
                                      ( (str("e") | str("E")) >> (str("+") | str("-") | str("")) >> match("[0-9]").repeat(1) ).maybe }

  rule(:boolean)  { str("true") | str("false") }

  rule(:null)     { str("null") }

  rule(:sp)       { match("[\\s]").repeat(0) }
end
