Canopy.Compiler.CIString = {
  toSexp: function() {
    return ['ci-string', this.stringValue()];
  },

  compile: function(builder, address, nodeType) {
    var string = this.stringValue(),
        length = string.length,
        chunk  = builder.chunk_(length);

    builder.if_(builder.stringMatchCI_(chunk, string), function(builder) {
      builder.syntaxNode_(address, nodeType, chunk, length);
    }, function(builder) {
      builder.failure_(address, this.textValue);
    }, this);
  },

  stringValue: function() {
    var string = '"' + this.elements[1].textValue + '"';
    return eval(string);
  }
};
