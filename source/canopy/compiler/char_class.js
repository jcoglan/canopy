Canopy.Compiler.CharClass = {
  toSexp: function() {
    return ['char-class', this.text];
  },

  compile: function(builder, address, nodeType) {
    var regex = new RegExp('^' + this.text),
        chunk = builder.chunk_(1);

    // TODO roll the existence check into regexMatch_
    builder.if_(builder.and_(chunk, builder.regexMatch_(regex, chunk)), function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, nodeType, of, of + ' + 1');
    }, function(builder) {
      builder.failure_(address, this.text);
    }, this);
  }
};
