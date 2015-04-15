Canopy.Compiler.CharClass = {
  toSexp: function() {
    return ['char-class', this.textValue];
  },

  compile: function(builder, address, nodeType) {
    var regex = new RegExp('^' + this.textValue),
        slice = builder.slice_(1);

    builder.if_(builder.and_(slice, builder.regexMatch_(regex, slice)), function(builder) {
      builder.syntaxNode_(address, nodeType, slice, 1);
    });
    builder.else_(function(builder) {
      builder.failure_(address, this.textValue);
    }, this);
  }
};
