'use strict';

module.exports = {
  toSexp: function() {
    return ['maybe', this.atom.toSexp()];
  },

  compile: function(builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_());
    this.atom.compile(builder, address);

    builder.unlessNode_(address, function(builder) {
      builder.syntaxNode_(address, startOffset, startOffset, null);
    });
  }
};
