Canopy.Compiler.String = {
  toSexp: function() {
    return ['string', eval(this.textValue)];
  },

  compile: function(builder, address, nodeType) {
    var string = eval(this.textValue),
        length = string.length,
        chunk  = builder.chunk_(length);

    builder.if_(builder.stringMatch_(chunk, string), function(builder) {
      builder.syntaxNode_(address, nodeType, chunk, length);
    }, function(builder) {
      builder.failure_(address, this.textValue);
    }, this);
  }
};
