Canopy.Compiler.extend({
  String: new JS.Module({
    toSexp: function() {
      return ['string', eval(this.textValue)];
    },
    
    compile: function(builder, address, nodeType) {
      var string = this.textValue,
          length = eval(this.textValue).length;
      
      builder.if_(builder.slice_(length) + ' === ' + string, function(builder) {
        builder.syntaxNode_(address, nodeType, string, length);
      });
      builder.else_(function(builder) {
        builder.failure_(address);
      });
    }
  })
});

