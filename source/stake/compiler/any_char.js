Stake.Compiler.extend({
  AnyChar: new JS.Module({
    toSexp: function() {
      return ['any-char'];
    },
    
    compile: function(builder, address) {
      var input  = builder.input_();
      
      builder.if_(input + ' === ""', function(builder) {
        builder.failure_(address);
      });
      builder.else_(function(builder) {
        builder.syntaxNode_(address, input + '.substring(0,1)', 1);
      });
    }
  })
});

