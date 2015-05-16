Canopy.Compiler.CharClass = {
  toSexp: function() {
    return ['char-class', this.text];
  },

  compile: function(builder, address, action) {
    var regex = new RegExp('^' + this.text),
        chunk = builder.chunk_(1);

    builder.if_(builder.regexMatch_(regex, chunk), function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of + ' + 1', null, action);
    }, function(builder) {
      builder.failure_(address, this.text);
    }, this);
  }
};
