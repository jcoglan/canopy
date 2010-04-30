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
    
    toSource: function() {
      var builder = new Stake.Builder();
      this.parseTree().compile(builder);
      return builder.serialize();
    },
    
    extend: {
      Choice: new JS.Module({
        toSexp: function() {
          var sexp = ['choice', this.first_expression.toSexp()];
          this.rest_expressions.forEach(function(part) {
            sexp.push(part.expression.toSexp());
          });
          return sexp;
        }
      }),
      
      SequencePart: new JS.Module({
        atomic: function() {
          var expression = this.expression;
          return expression.parsing_expression || expression;
        },
        
        toSexp: function() {
          var expression = this.atomic(),
              sexp = expression.toSexp();
          
          if (this.elements[0].identifier)
            sexp = ['label', this.elements[0].identifier.textValue, sexp];
          
          return sexp;
        },
        
        compile: function(builder, address) {
          return this.atomic().compile(builder, address);
        }
      }),
      
      PredicatedAtom: new JS.Module({
        atomic: function() {
          var expression = this.atom;
          return expression.parsing_expression || expression;
        },
        
        toSexp: function() {
          var expression = this.atomic(),
              table      = {'&': 'and', '!': 'not'},
              predicate  = table[this.predicate.textValue];
          
          return [predicate, expression.toSexp()];
        }
      }),
      
      Reference: new JS.Module({
        toSexp: function() {
          return ['reference', this.identifier.textValue];
        }
      })
    }
  })
});

