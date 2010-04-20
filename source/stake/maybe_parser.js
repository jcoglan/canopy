Stake.extend({
  MaybeParser: new JS.Class(Stake.Parser, {
    initialize: function(parser) {
      this._parser = parser;
    },
    
    consume: function(input, session) {
      var node = this._parser.consume(input, session);
      return node || this._syntaxNode('', session.offset);
    }
  })
});

