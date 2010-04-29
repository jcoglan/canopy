Stake.Compiler.extend({
  AnyChar: new JS.Module({
    toSexp: function() {
      return ['any-char'];
    },
    
    compile: function(builder, address) {
      var input  = builder.input_(),
          offset = builder.offset_();
      
      var temp = builder.tempVar_('text', input + '.substring(' + offset + ',1)');
      
      builder.if_(temp + ' === ""', function(builder) {
        builder.failure_(address);
      });
      builder.else_(function(builder) {
        builder.syntaxNode_(address, temp, 1);
      });
    }
  })
});

