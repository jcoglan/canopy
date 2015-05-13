class ParsletPEG < Parslet::Parser
  root(:grammar)

  rule(:grammar)                  { __.repeat(0) >> grammar_name >>
                                    (__.repeat(0) >> grammar_rule).repeat(1).as(:rules) >>
                                    __.repeat(0) }

  rule(:grammar_name)             { str('grammar') >> str(':').maybe >> __.repeat(1) >> object_identifier }

  rule(:grammar_rule)             { identifier >> assignment >> parsing_expression }

  rule(:assignment)               { __.repeat(1) >> str('<-') >> __.repeat(1) }

  rule(:parsing_expression)       { choice_expression | choice_part }

  rule(:parenthesised_expression) { str('(') >> __.repeat(0) >> parsing_expression >>
                                    __.repeat(0) >> str(')') }

  rule(:choice_expression)        { choice_part.as(:first_part) >>
                                    (__.repeat(1) >> str('/') >> __.repeat(1) >> choice_part.as(:expression)).repeat(1).as(:rest) }

  rule(:choice_part)              { (action_expression | sequence_expression | sequence_part) >>
                                    (__.repeat(1) >> type_tag).maybe }

  rule(:action_expression)        { actionable_expression >> __.repeat(1) >> action_tag }

  rule(:actionable_expression)    { str('(') >> __.repeat(0) >> actionable_expression >> __.repeat(0) >> str(')') |
                                    sequence_expression |
                                    repeated_atom |
                                    terminal_node }

  rule(:action_tag)               { str('%') >> identifier }

  rule(:type_tag)                 { str('<') >> object_identifier >> str('>') }

  rule(:sequence_expression)      { sequence_part.as(:first_part) >>
                                    (__.repeat(1) >> sequence_part.as(:expression)).repeat(1).as(:rest) }

  rule(:sequence_part)            { label.maybe >> (maybe_atom | repeated_atom | atom).as(:expression) }

  rule(:maybe_atom)               { atom >> str('?') }

  rule(:repeated_atom)            { atom >> (str('*') | str('+')).as(:quantifier) }

  rule(:atom)                     { parenthesised_expression |
                                    predicated_atom |
                                    reference_expression |
                                    terminal_node }

  rule(:terminal_node)            { string_expression |
                                    ci_string_expression |
                                    char_class_expression |
                                    any_char_expression }

  rule(:predicated_atom)          { (str('&') | str('!')).as(:predicate) >> atom }

  rule(:reference_expression)     { identifier >> assignment.absent? }

  rule(:string_expression)        { str('"') >> (str('\\') >> any | match('[^"]')).repeat(0) >> str('"') |
                                    str("'") >> (str('\\') >> any | match("[^']")).repeat(0) >> str("'") }

  rule(:ci_string_expression)     { str('`') >> (str('\\') >> any | match('[^`]')).repeat(0) >> str('`') }

  rule(:any_char_expression)      { str('.') }

  rule(:char_class_expression)    { str('[') >> str('^').maybe >> (str('\\') >> any | match('[^\\]]')).repeat(1) >> str(']') }

  rule(:label)                    { identifier >> str(':') }

  rule(:object_identifier)        { identifier >> (str('.') >> identifier).repeat(0) }

  rule(:identifier)               { match('[a-zA-Z_]') >> match('[a-zA-Z0-9_]').repeat(0) }

  rule(:__)                       { match('[\\s]') | comment }

  rule(:comment)                  { str('#') >> match('[^\n]').repeat(0) }
end
