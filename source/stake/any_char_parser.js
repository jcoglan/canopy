Stake.extend({
  AnyCharParser: new JS.Class(Stake.Parser, {
    consume: function(input, session) {
      if (input === '') return null;
      return this._syntaxNode(input.substring(0,1), session.offset);
    }
  })
});

