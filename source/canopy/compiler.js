Canopy.Compiler = function(grammarText) {
  this._grammarText = grammarText;
};

Canopy.extend(Canopy.Compiler.prototype, {
  parseTree: function() {
    if (this._tree) return this._tree;
    var P = Canopy.MetaGrammarParser, message;

    this._tree = P.parse(this._grammarText);
    if (this._tree) return this._tree;

    message = P.formatError(P.lastError);
    throw new Error(message);
  },

  toSexp: function(tree) {
    return this.parseTree().toSexp();
  },

  toSource: function() {
    var builder = new Canopy.Builder();
    this.parseTree().compile(builder);
    return builder.serialize();
  }
});

