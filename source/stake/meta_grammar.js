Stake.extend({
  MetaGrammar: Stake.Parser.fromSexp(
    ['grammar', 'MetaGrammar',
      
      ['rule', 'grammar',
        ['type', 'Stake.MetaGrammar.Grammar',
          ['sequence',
            ['repeat', 0, ['reference', 'space']],
            ['reference', 'grammar_name'],
            ['repeat', 1,
              ['sequence',
                ['repeat', 0, ['reference', 'space']],
                ['reference', 'grammar_rule']]],
            ['repeat', 0, ['reference', 'space']]]]],
      
      ['rule', 'grammar_name',
        ['sequence',
          ['string', 'grammar '],
          ['reference', 'identifier']]],
      
      ['rule', 'grammar_rule',
        ['type', 'Stake.MetaGrammar.GrammarRule',
          ['sequence',
            ['string', '#'],
            ['reference', 'identifier'],
            ['repeat', 1, ['reference', 'space']],
            ['string', '<-'],
            ['repeat', 1, ['reference', 'space']],
            ['reference', 'parsing_expression']]]],
      
      ['rule', 'parsing_expression',
        ['choice',
          ['reference', 'sequence_expression'],
          ['reference', 'atom']]],
      
      ['rule', 'atom',
        ['choice',
          ['reference', 'string_expression']]],
      
      ['rule', 'sequence_expression',
        ['type', 'Stake.MetaGrammar.SequenceExpression',
          ['sequence',
            ['label', 'first_expression',
              ['reference', 'atom']],
            ['label', 'rest_expressions',
              ['repeat', 1,
                ['sequence',
                  ['repeat', 1, ['reference', 'space']],
                  ['reference', 'atom']]]]]]],
      
      ['rule', 'string_expression',
        ['type', 'Stake.MetaGrammar.StringExpression',
          ['sequence',
            ['string', '"'],
            ['repeat', 0, ['char-class', '[^"]']],
            ['string', '"']]]],
      
      ['rule', 'identifier',
        ['sequence',
          ['char-class', '[a-zA-Z_$]'],
          ['repeat', 0,
            ['char-class', '[a-zA-Z0-9_$]']]]],
      
      ['rule', 'space',
        ['char-class', '[\\s\\n\\r\\t]']]])
});

Stake.MetaGrammar.Grammar = new JS.Module({
  toSexp: function() {
    var sexp = ['grammar', this.grammar_name.identifier.textValue];
    this.elements[2].forEach(function(rule) {
      sexp.push(rule.grammar_rule.toSexp());
    });
    return sexp;
  }
});

Stake.MetaGrammar.GrammarRule = new JS.Module({
  toSexp: function() {
    return ['rule', this.identifier.textValue, this.parsing_expression.toSexp()];
  }
});

Stake.MetaGrammar.SequenceExpression = new JS.Module({
  toSexp: function() {
    var sexp = ['sequence', this.first_expression.toSexp()];
    this.rest_expressions.forEach(function(part) {
      sexp.push(part.atom.toSexp());
    });
    return sexp;
  }
});

Stake.MetaGrammar.StringExpression = new JS.Module({
  toSexp: function() {
    return ['string', this.elements[1].textValue];
  }
});

