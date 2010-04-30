Stake.Compiler.extend({
  CharClass: new JS.Module({
    toSexp: function() {
      return ['char-class', this.textValue];
    },
    
    compile: function(builder, address) {
      var regex  = '/^' + this.textValue + '/',
          temp   = builder.tempVar_('temp', builder.slice_(1)),
          match  = builder.tempVar_('match');
      
      builder.if_(match + ' = ' + temp + '.match(' + regex + ')', function(builder) {
        builder.syntaxNode_(address, match + '[0]', 1);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    }
  })
});

