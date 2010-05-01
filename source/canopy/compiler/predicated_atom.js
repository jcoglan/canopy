Canopy.Compiler.extend({
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
    },
    
    compile: function(builder, address, nodeType) {
      var startOffset = builder.tempVar_('index', builder.offset_()),
          table       = {'&': 'if_', '!': 'unless_'},
          branch      = table[this.predicate.textValue];
      
      this.atomic().compile(builder, address);
      builder.line_(builder.offset_() + ' = ' + startOffset);
      
      builder[branch](address, function(builder) {
        builder.syntaxNode_(address, nodeType, '""', 0);
      });
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    }
  })
});

