Stake.Compiler.extend({
  CharClass: new JS.Module({
    toSexp: function() {
      return ['char-class', this.textValue];
    },
    
    compile: function(builder, address) {
      var regex  = '/^' + this.textValue + '/',
          input  = builder.input_(),
          temp   = builder.tempVar_('match');
      
      builder.if_(temp + ' = ' + input + '.match(' + regex + ')', function(builder) {
        builder.syntaxNode_(address, temp + '[0]', 1);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    }
  })
});

