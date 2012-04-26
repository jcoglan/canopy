Canopy.Compiler = function(grammarText) {
  this._grammarText = grammarText;
};

Canopy.extend(Canopy.Compiler.prototype, {
  parseTree: function() {
    return this._tree = this._tree ||
                        Canopy.MetaGrammarParser.parse(this._grammarText);
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

