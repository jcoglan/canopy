Stake.Compiler.extend({
  AnyChar: new JS.Module({
    toSexp: function() {
      return ['any-char'];
    },
    
    compile: function(builder, address) {
      var input  = builder.input_(),
          offset = builder.offset_();
      
      builder.if_(input + ' === ""', function(builder) {
        builder.line_(address + ' = null');
      });
      builder.else_(function(builder) {
        builder.line_(address + ' = new Stake.SyntaxNode(' + input + '.substring(0,1), ' + offset + ')');
        builder.line_(offset + ' += 1');
      });
    }
  })
});

