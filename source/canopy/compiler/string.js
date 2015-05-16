Canopy.Compiler.String = {
  toSexp: function() {
    return ['string', eval(this.text)];
  },

  compile: function(builder, address, action) {
    var string = eval(this.text),
        length = string.length,
        chunk  = builder.chunk_(length);

    builder.if_(builder.stringMatch_(chunk, string), function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of + ' + ' + length, null, action);
    }, function(builder) {
      builder.failure_(address, this.text);
    }, this);
  }
};
