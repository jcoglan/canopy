Stake.Parser.extend({
  CharClass: new JS.Class(Stake.Parser, {
    initialize: function(charClass) {
      this._charClass = charClass;
      this._pattern = new RegExp('^' + charClass);
    },
    
    consume: function(input, session) {
      var match = input.match(this._pattern);
      return match ? this._syntaxNode(String(match), session.offset) : null;
    }
  })
});

