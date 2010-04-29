Stake.Compiler.extend({
  CharClass: new JS.Module({
    toSexp: function() {
      return ['char-class', this.textValue];
    },
    
    compile: function(builder, address) {
      var regex  = '/^' + this.textValue + '/',
          input  = builder.input_(),
          offset = builder.offset_(),
          text   = builder.tempVar_('text', input + '.substring(' + offset + ',1)'),
          match  = builder.tempVar_('match');
      
      builder.if_(match + ' = ' + text + '.match(' + regex + ')', function(builder) {
        builder.syntaxNode_(address, match + '[0]', 1);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    }
  })
});

