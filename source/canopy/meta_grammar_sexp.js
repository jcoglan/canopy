Canopy.extend({
  MetaGrammarParser: Canopy.Parser.fromSexp(
    ['grammar', 'MetaGrammar',
      
      // grammar <- space* grammar_name rules:(space* grammar_rule)+ space* <Canopy.Compiler.Grammar>
      ['rule', 'grammar',
        ['type', 'Canopy.Compiler.Grammar',
          ['sequence',
            ['repeat', 0, ['reference', 'space']],
            ['reference', 'grammar_name'],
            ['label', 'rules',
              ['repeat', 1,
                ['sequence',
                  ['repeat', 0, ['reference', 'space']],
                  ['reference', 'grammar_rule']]]],
            ['repeat', 0, ['reference', 'space']]]]],
      
      // grammar_name <- "grammar " object_identifier
      ['rule', 'grammar_name',
        ['sequence',
          ['string', 'grammar '],
          ['reference', 'object_identifier']]],
      
      // grammar_rule <- identifier assignment parsing_expression <Canopy.Compiler.GrammarRule>
      ['rule', 'grammar_rule',
        ['type', 'Canopy.Compiler.GrammarRule',
          ['sequence',
            ['reference', 'identifier'],
            ['reference', 'assignment'],
            ['reference', 'parsing_expression']]]],
      
      // assignment <- space+ "<-" space+
      ['rule', 'assignment',
        ['sequence',
          ['repeat', 1, ['reference', 'space']],
          ['string', '<-'],
          ['repeat', 1, ['reference', 'space']]]],
      
      // parsing_expression <- choice_expression / choice_part
      ['rule', 'parsing_expression',
        ['choice',
          ['reference', 'choice_expression'],
          ['reference', 'choice_part']]],
      
      // parenthesised_expression <- "(" space* parsing_expression space* ")"
      ['rule', 'parenthesised_expression',
        ['sequence',
          ['string', '('],
          ['repeat', 0, ['reference', 'space']],
          ['reference', 'parsing_expression'],
          ['repeat', 0, ['reference', 'space']],
          ['string', ')']]],
      
      // choice_expression <- first_part:choice_part
      //                      rest:(space+ "/" space+ expression:choice_part)+
      //                      <Canopy.Compiler.Choice>
      ['rule', 'choice_expression',
        ['type', 'Canopy.Compiler.Choice',
          ['sequence',
            ['label', 'first_part',
              ['reference', 'choice_part']],
            ['label', 'rest',
              ['repeat', 1,
                ['sequence',
                  ['repeat', 1, ['reference', 'space']],
                  ['string', '/'],
                  ['repeat', 1, ['reference', 'space']],
                  ['label', 'expression',
                    ['reference', 'choice_part']]]]]]]],
      
      // choice_part <- (sequence_expression / sequence_part) (space+ type_expression)? <Canopy.Compiler.ChoicePart>
      ['rule', 'choice_part',
        ['type', 'Canopy.Compiler.ChoicePart',
          ['sequence',
            ['choice',
              ['reference', 'sequence_expression'],
              ['reference', 'sequence_part']],
            ['maybe',
              ['sequence',
                ['repeat', 1, ['reference', 'space']],
                ['reference', 'type_expression']]]]]],
      
      // type_expression <- "<" object_identifier ">"
      ['rule', 'type_expression',
        ['sequence',
          ['string', '<'],
          ['reference', 'object_identifier'],
          ['string', '>']]],
      
      // sequence_expression <- first_part:sequence_part
      //                        rest:(space+ expression:sequence_part)+
      //                        <Canopy.Compiler.Sequence>
      ['rule', 'sequence_expression',
        ['type', 'Canopy.Compiler.Sequence',
          ['sequence',
            ['label', 'first_part',
              ['reference', 'sequence_part']],
            ['label', 'rest',
              ['repeat', 1,
                ['sequence',
                  ['repeat', 1, ['reference', 'space']],
                  ['label', 'expression',
                    ['reference', 'sequence_part']]]]]]]],
      
      // sequence_part <- label? expression:(quantified_atom / atom) <Canopy.Compiler.SequencePart>
      ['rule', 'sequence_part',
        ['type', 'Canopy.Compiler.SequencePart',
          ['sequence',
            ['maybe', ['reference', 'label']],
            ['label', 'expression',
              ['choice',
                ['reference', 'quantified_atom'],
                ['reference', 'atom']]]]]],
      
      // quantified_atom <- atom quantifier <Canopy.Compiler.Repeat>
      ['rule', 'quantified_atom',
        ['type', 'Canopy.Compiler.Repeat',
          ['sequence',
            ['reference', 'atom'],
            ['reference', 'quantifier']]]],
      
      // atom <- parenthesised_expression
      //       / predicated_atom
      //       / reference_expression
      //       / string_expression
      //       / any_char_expression
      //       / char_class_expression
      ['rule', 'atom',
        ['choice',
          ['reference', 'parenthesised_expression'],
          ['reference', 'predicated_atom'],
          ['reference', 'reference_expression'],
          ['reference', 'string_expression'],
          ['reference', 'any_char_expression'],
          ['reference', 'char_class_expression']]],
      
      // predicated_atom <- predicate:("&" / "!") atom <Canopy.Compiler.PredicatedAtom>
      ['rule', 'predicated_atom',
        ['type', 'Canopy.Compiler.PredicatedAtom',
          ['sequence',
            ['label', 'predicate',
              ['choice',
                ['string', '&'],
                ['string', '!']]],
            ['reference', 'atom']]]],
      
      // reference_expression <- identifier !assignment <Canopy.Compiler.Reference>
      ['rule', 'reference_expression',
        ['type', 'Canopy.Compiler.Reference',
          ['sequence',
            ['reference', 'identifier'],
            ['not', ['reference', 'assignment']]]]],
      
      // string_expression <- "\"" ("\\" . / [^"])* "\""
      //                      <Canopy.Compiler.String>
      ['rule', 'string_expression',
        ['type', 'Canopy.Compiler.String',
          ['sequence',
            ['string', '"'],
            ['repeat', 0,
              ['choice',
                ['sequence',
                  ['string', '\\'],
                  ['any-char']],
                ['char-class', '[^"]']]],
            ['string', '"']]]],
      
      // any_char_expression <- "." <Canopy.Compiler.AnyChar>
      ['rule', 'any_char_expression',
        ['type', 'Canopy.Compiler.AnyChar',
          ['string', '.']]],
      
      // char_class_expression <- "[" "^"? ("\\" . / [^\]])+ "]"
      //                          <Canopy.Compiler.CharClass>
      ['rule', 'char_class_expression',
        ['type', 'Canopy.Compiler.CharClass',
          ['sequence',
            ['string', '['],
            ['maybe', ['string', '^']],
            ['repeat', 1,
              ['choice',
                ['sequence',
                  ['string', '\\'],
                  ['any-char']],
                ['char-class', '[^\\]]']]],
            ['string', ']']]]],
      
      // label <- identifier ":"
      ['rule', 'label',
        ['sequence',
          ['reference', 'identifier'],
          ['string', ':']]],
      
      // object_identifier <- identifier ("." identifier)*
      ['rule', 'object_identifier',
        ['sequence',
          ['reference', 'identifier'],
          ['repeat', 0,
            ['sequence',
              ['string', '.'],
              ['reference', 'identifier']]]]],
      
      // identifier <- [a-zA-Z_$] [a-zA-Z0-9_$]*
      ['rule', 'identifier',
        ['sequence',
          ['char-class', '[a-zA-Z_$]'],
          ['repeat', 0,
            ['char-class', '[a-zA-Z0-9_$]']]]],
      
      // quantifier <- "?" / "*" / "+"
      ['rule', 'quantifier',
        ['choice',
          ['string', '?'],
          ['string', '*'],
          ['string', '+']]],
      
      // space <- [\s\n\r\t]
      ['rule', 'space',
        ['char-class', '[\\s\\n\\r\\t]']]])
});

