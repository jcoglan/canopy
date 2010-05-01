Canopy.Parser.extend({
  Maybe: new JS.Class(Canopy.Parser, {
    initialize: function(parser) {
      this._parser = parser;
    },
    
    consume: function(input, session) {
      var node = this._parser.consume(input, session);
      return this._extendNode(node) || this._syntaxNode('', session.offset);
    }
  })
});

