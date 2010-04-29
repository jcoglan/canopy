Stake.Compiler.extend({
  String: new JS.Module({
    toSexp: function() {
      return ['string', eval(this.textValue)];
    },
    
    compile: function(builder, address) {
      var string = this.textValue,
          length = eval(this.textValue).length,
          input  = builder.input_(),
          offset = builder.offset_();
      
      builder.if_(input + '.substring(' + offset +',' + length + ') === ' + string, function(builder) {
        builder.line_(address + ' = new Stake.SyntaxNode(' + string + ', ' + offset + ')');
        builder.line_(offset + ' += ' + length);
      });
      builder.else_(function(builder) {
        builder.line_(address + ' = null');
      });
    }
  })
});

