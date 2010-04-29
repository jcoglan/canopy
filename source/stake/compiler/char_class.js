Stake.Compiler.extend({
  CharClass: new JS.Module({
    toSexp: function() {
      return ['char-class', this.textValue];
    },
    
    compile: function(builder, address) {
      var regex  = '/^' + this.textValue + '/',
          input  = builder.input_(),
          offset = builder.offset_(),
          temp   = builder.tempVar_('match');
      
      builder.if_(temp + ' = ' + input + '.match(' + regex + ')', function(builder) {
        builder.line_(address + ' = new Stake.SyntaxNode(' + temp + '[0], ' + offset + ')');
        builder.line_(offset + ' += 1');
      });
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    }
  })
});

