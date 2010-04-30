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
      
      builder.if_(builder.slice_(length) + ' === ' + string, function(builder) {
        builder.syntaxNode_(address, string, length);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    }
  })
});

