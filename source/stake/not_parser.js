Stake.extend({
  NotParser: new JS.Class(Stake.Parser, {
    initialize: function(parser) {
      this._parser = parser;
    },
    
    consume: function(input, offset) {
      var node = this._parser.consume(input, offset);
      return node ? null : this._syntaxNode('', offset);
    }
  })
});

