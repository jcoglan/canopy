class ParsletLisp < Parslet::Parser
  root(:program)

  rule(:program)   { cell.repeat(1) }
  rule(:cell)      { space.repeat(0) >> (list | atom) >> space.repeat(0) }
  rule(:list)      { str('(') >> cell.repeat(1) >> str(')') }
  rule(:atom)      { boolean | integer | string | symbol }
  rule(:boolean)   { str('#t') | str('#f') }
  rule(:integer)   { match('[1-9]') >> match('[0-9]').repeat(0) }
  rule(:string)    { str('"') >> (str('\\') >> any | match('[^"]')).repeat(0) >> str('"') }
  rule(:symbol)    { (delimiter.absent? >> any).repeat(1) }
  rule(:space)     { match('[\\s]') }
  rule(:paren)     { str('(') | str(')') }
  rule(:delimiter) { paren | space }
end
