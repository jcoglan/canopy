Canopy.Compiler.extend({
  CharClass: new JS.Module({
    toSexp: function() {
      return ['char-class', this.textValue];
    },
    
    compile: function(builder, address, nodeType) {
      var regex  = '/^' + this.textValue + '/',
          temp   = builder.tempVar_('temp', builder.slice_(1)),
          match  = builder.tempVar_('match');
      
      builder.if_(match + ' = ' + temp + ' && ' + temp + '.match(' + regex + ')', function(builder) {
        builder.syntaxNode_(address, nodeType, match + '[0]', 1);
      });
      builder.else_(function(builder) {
        builder.failure_(address, this.textValue);
      }, this);
    }
  })
});

