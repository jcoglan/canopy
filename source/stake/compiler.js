Stake.extend({
  Compiler: new JS.Class({
    initialize: function(grammarText) {
      this._grammarText = grammarText;
    },
    
    parseTree: function() {
      return this._tree = this._tree ||
                          Stake.MetaGrammar.parse(this._grammarText);
    },
    
    toSexp: function(tree) {
      return this.parseTree().toSexp();
    },
    
    extend: {
      Grammar: new JS.Module({
        toSexp: function() {
          var sexp = ['grammar', this.grammar_name.identifier.textValue];
          this.elements[2].forEach(function(rule) {
            sexp.push(rule.grammar_rule.toSexp());
          });
          return sexp;
        }
      }),
      
      GrammarRule: new JS.Module({
        toSexp: function() {
          return ['rule', this.identifier.textValue, this.parsing_expression.toSexp()];
        }
      }),
      
      ChoiceExpression: new JS.Module({
        toSexp: function() {
          var sexp = ['choice', this.first_expression.toSexp()];
          this.rest_expressions.forEach(function(part) {
            sexp.push(part.expression.toSexp());
          });
          return sexp;
        }
      }),
      
      ChoicePart: new JS.Module({
        toSexp: function() {
          var sexp = this.elements[0].toSexp(), type;
          
          if (type = this.elements[1].type_expression)
            sexp = ['type', type.object_identifier.textValue, sexp];
          
          return sexp;
        }
      }),
      
      SequenceExpression: new JS.Module({
        toSexp: function() {
          var sexp = ['sequence', this.first_expression.toSexp()];
          this.rest_expressions.forEach(function(part) {
            sexp.push(part.atom.toSexp());
          });
          return sexp;
        }
      }),
      
      Atom: new JS.Module({
        toSexp: function() {
          var exp   = this.expression.parsing_expression || this.expression,
              sexp  = exp.toSexp(),
              label;
          
          switch (this.elements[2].textValue) {
            case '?': sexp = ['maybe', sexp]; break;
            case '*': sexp = ['repeat', 0, sexp]; break;
            case '+': sexp = ['repeat', 1, sexp]; break;
          }
          
          if (label = this.elements[0].identifier)
            sexp = ['label', label.textValue, sexp];
          
          return sexp;
        }
      }),
      
      NegatedAtom: new JS.Module({
        toSexp: function() {
          return ['not', this.atom.toSexp()];
        }
      }),
      
      ReferenceExpression: new JS.Module({
        toSexp: function() {
          return ['reference', this.identifier.textValue];
        }
      }),
      
      StringExpression: new JS.Module({
        toSexp: function() {
          return ['string', eval('"' + this.elements[1].textValue + '"')];
        }
      }),
      
      CharClassExpression: new JS.Module({
        toSexp: function() {
          return ['char-class', this.textValue];
        }
      }),
      
      AnyCharExpression: new JS.Module({
        toSexp: function() {
          return ['any-char'];
        }
      })
    }
  })
});

