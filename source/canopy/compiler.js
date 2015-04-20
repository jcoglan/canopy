Canopy.Compiler = function(grammarText, builder) {
  this._grammarText = grammarText;
  this._builder = builder;
};

Canopy.extend(Canopy.Compiler.prototype, {
  parseTree: function() {
    if (this._tree) return this._tree;
    var P = Canopy.MetaGrammar, message;

    this._tree = P.parse(this._grammarText);
    if (this._tree) return this._tree;

    message = P.formatError(P.lastError);
    throw new Error(message);
  },

  toSexp: function(tree) {
    return this.parseTree().toSexp();
  },

  toSource: function() {
    this.parseTree().compile(this._builder);
    return this._builder.serialize();
  }
});
