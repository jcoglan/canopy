Stake.extend({
  CharClassParser: new JS.Class(Stake.Parser, {
    initialize: function(charClass) {
      this._charClass = charClass;
      this._pattern = new RegExp('^' + charClass);
    },
    
    consume: function(input, offset) {
      var match = input.match(this._pattern);
      return match ? this._syntaxNode(String(match), offset) : null;
    }
  })
});

