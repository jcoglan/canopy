class ParsletPEG < Parslet::Parser
  root(:grammar)

  rule(:grammar)                  { space.repeat(0) >> grammar_name >>
                                    (space.repeat(0) >> grammar_rule).repeat(1).as(:rules) >>
                                    space.repeat(0) }

  rule(:grammar_name)             { str('grammar ') >> object_identifier }

  rule(:grammar_rule)             { identifier >> assignment >> parsing_expression }

  rule(:assignment)               { space.repeat(1) >> str('<-') >> space.repeat(1) }

  rule(:parsing_expression)       { choice_expression | choice_part }

  rule(:parenthesised_expression) { str('(') >> space.repeat(0) >> parsing_expression >>
                                    space.repeat(0) >> str(')') }

  rule(:choice_expression)        { choice_part.as(:first_part) >>
                                    (space.repeat(1) >> str('/') >> space.repeat(1) >> choice_part.as(:expression)).repeat(1).as(:rest) }

  rule(:choice_part)              { (sequence_expression | sequence_part) >>
                                    (space.repeat(1) >> type_expression).maybe }

  rule(:type_expression)          { str('<') >> object_identifier >> str('>') }

  rule(:sequence_expression)      { sequence_part.as(:first_part) >>
                                    (space.repeat(1) >> sequence_part.as(:expression)).repeat(1).as(:rest) }

  rule(:sequence_part)            { label.maybe >> (quantified_atom | atom).as(:expression) }

  rule(:quantified_atom)          { atom >> quantifier }

  rule(:atom)                     { parenthesised_expression |
                                    predicated_atom |
                                    reference_expression |
                                    string_expression |
                                    ci_string_expression |
                                    any_char_expression |
                                    char_class_expression }

  rule(:predicated_atom)          { (str('&') | str('!')).as(:predicate) >> atom }

  rule(:reference_expression)     { identifier >> assignment.absent? }

  rule(:string_expression)        { str('"') >> (str('\\') >> any | match('[^"]')).repeat(0) >> str('"') }

  rule(:ci_string_expression)     { str('`') >> (str('\\') >> any | match('[^`]')).repeat(0) >> str('`') }

  rule(:any_char_expression)      { str('.') }

  rule(:char_class_expression)    { str('[') >> str('^').maybe >> (str('\\') >> any | match('[^\\]]')).repeat(1) >> str(']') }

  rule(:label)                    { identifier >> str(':') }

  rule(:object_identifier)        { identifier >> (str('.') >> identifier).repeat(0) }

  rule(:identifier)               { match('[a-zA-Z_]') >> match('[a-zA-Z0-9_]').repeat(0) }

  rule(:quantifier)               { str('?') | str('*') | str('+') }

  rule(:space)                    { match('[\\s]') }
end
