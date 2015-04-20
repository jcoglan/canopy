Canopy.Compiler.CharClass = {
  toSexp: function() {
    return ['char-class', this.text];
  },

  compile: function(builder, address, nodeType) {
    var regex = new RegExp('^' + this.text),
        chunk = builder.chunk_(1);

    builder.if_(builder.and_(chunk, builder.regexMatch_(regex, chunk)), function(builder) {
      builder.syntaxNode_(address, nodeType, chunk, 1);
    }, function(builder) {
      builder.failure_(address, this.text);
    }, this);
  }
};
