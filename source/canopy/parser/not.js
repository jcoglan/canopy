Canopy.Parser.extend({
  Not: new JS.Class(Canopy.Parser, {
    initialize: function(parser) {
      this._parser = parser;
    },
    
    consume: function(input, session) {
      var offset = session.offset,
          node = this._parser.consume(input, session);
      
      session.offset = offset;
      return node ? null : this._syntaxNode('', offset);
    }
  })
});

