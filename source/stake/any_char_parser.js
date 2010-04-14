Stake.extend({
  AnyCharParser: new JS.Class(Stake.Parser, {
    consume: function(input, offset) {
      if (input === '') return null;
      return this._syntaxNode(input.substring(0,1), offset);
    }
  })
});

