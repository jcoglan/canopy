Stake.extend({
  MetaGrammar: Stake.Parser.fromSexp(
    ['grammar', 'MetaGrammar',
      
      // grammar <- space* grammar_name (space* grammar_rule)+ space* <Stake.Compiler.Grammar>
      ['rule', 'grammar',
        ['type', 'Stake.Compiler.Grammar',
          ['sequence',
            ['repeat', 0, ['reference', 'space']],
            ['reference', 'grammar_name'],
            ['repeat', 1,
              ['sequence',
                ['repeat', 0, ['reference', 'space']],
                ['reference', 'grammar_rule']]],
            ['repeat', 0, ['reference', 'space']]]]],
      
      // grammar_name <- "grammar " identifier
      ['rule', 'grammar_name',
        ['sequence',
          ['string', 'grammar '],
          ['reference', 'identifier']]],
      
      // grammar_rule <- identifier assignment parsing_expression <Stake.Compiler.GrammarRule>
      ['rule', 'grammar_rule',
        ['type', 'Stake.Compiler.GrammarRule',
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
      
      // choice_expression <- first_expression:choice_part
      //                      rest_expressions:(space+ "/" space+ expression:choice_part)+
      //                      <Stake.Compiler.ChoiceExpression>
      ['rule', 'choice_expression',
        ['type', 'Stake.Compiler.ChoiceExpression',
          ['sequence',
            ['label', 'first_expression',
              ['reference', 'choice_part']],
            ['label', 'rest_expressions',
              ['repeat', 1,
                ['sequence',
                  ['repeat', 1, ['reference', 'space']],
                  ['string', '/'],
                  ['repeat', 1, ['reference', 'space']],
                  ['label', 'expression',
                    ['reference', 'choice_part']]]]]]]],
      
      // choice_part <- (sequence_expression / atom) (space+ type_expression)? <Stake.Compiler.ChoicePart>
      ['rule', 'choice_part',
        ['type', 'Stake.Compiler.ChoicePart',
          ['sequence',
            ['choice',
              ['reference', 'sequence_expression'],
              ['reference', 'atom']],
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
      
      // sequence_expression <- first_expression:atom
      //                        rest_expressions:(space+ atom)+
      //                        <Stake.Compiler.SequenceExpression>
      ['rule', 'sequence_expression',
        ['type', 'Stake.Compiler.SequenceExpression',
          ['sequence',
            ['label', 'first_expression',
              ['reference', 'atom']],
            ['label', 'rest_expressions',
              ['repeat', 1,
                ['sequence',
                  ['repeat', 1, ['reference', 'space']],
                  ['reference', 'atom']]]]]]],
      
      // atom <- label? expression:( parenthesised_expression
      //                           / negated_atom
      //                           / reference_expression
      //                           / string_expression
      //                           / any_char_expression
      //                           / char_class_expression ) quantifier?
      //         <Stake.Compiler.Atom>
      ['rule', 'atom',
        ['type', 'Stake.Compiler.Atom',
          ['sequence',
            ['maybe', ['reference', 'label']],
            ['label', 'expression',
              ['choice',
                ['reference', 'parenthesised_expression'],
                ['reference', 'negated_atom'],
                ['reference', 'reference_expression'],
                ['reference', 'string_expression'],
                ['reference', 'any_char_expression'],
                ['reference', 'char_class_expression']]],
            ['maybe', ['reference', 'quantifier']]]]],
      
      // negated_atom <- "!" atom <Stake.Compiler.NegatedAtom>
      ['rule', 'negated_atom',
        ['type', 'Stake.Compiler.NegatedAtom',
          ['sequence',
            ['string', '!'],
            ['reference', 'atom']]]],
      
      // reference_expression <- identifier !assignment <Stake.Compiler.ReferenceExpression>
      ['rule', 'reference_expression',
        ['type', 'Stake.Compiler.ReferenceExpression',
          ['sequence',
            ['reference', 'identifier'],
            ['not', ['reference', 'assignment']]]]],
      
      // string_expression <- "\"" ("\\" . / [^"])* "\""
      //                      <Stake.Compiler.StringExpression>
      ['rule', 'string_expression',
        ['type', 'Stake.Compiler.StringExpression',
          ['sequence',
            ['string', '"'],
            ['repeat', 0,
              ['choice',
                ['sequence',
                  ['string', '\\'],
                  ['any-char']],
                ['char-class', '[^"]']]],
            ['string', '"']]]],
      
      // any_char_expression <- "." <Stake.Compiler.AnyCharExpression>
      ['rule', 'any_char_expression',
        ['type', 'Stake.Compiler.AnyCharExpression',
          ['string', '.']]],
      
      // char_class_expression <- "[" "^"? ("\\" . / [^\]])+ "]"
      //                          <Stake.Compiler.CharClassExpression>
      ['rule', 'char_class_expression',
        ['type', 'Stake.Compiler.CharClassExpression',
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

