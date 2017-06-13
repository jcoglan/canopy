'use strict';

module.exports = {
  toSexp: function() {
    var expression = this.atom,
        table      = {'&': 'and', '!': 'not'},
        predicate  = table[this.predicate.text];

    return [predicate, expression.toSexp()];
  },

  compile: function(builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_()),
        table       = {'&': 'ifNode_', '!': 'unlessNode_'},
        branch      = table[this.predicate.text];

    this.atom.compile(builder, address);
    builder.assign_(builder.offset_(), startOffset);

    builder[branch](address, function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of, null);
    }, function(builder) {
      builder.assign_(address, builder.nullNode_());
    });
  }
};
