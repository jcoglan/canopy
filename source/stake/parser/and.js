Stake.Parser.extend({
  And: new JS.Class(Stake.Parser, {
    initialize: function(parser) {
      this._parser = parser;
    },
    
    consume: function(input, session) {
      var offset = session.offset,
          node = this._parser.consume(input, session);
      
      session.offset = offset;
      return node ? this._syntaxNode('', offset) : null;
    }
  })
});

