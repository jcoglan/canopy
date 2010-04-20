Stake.extend({
  ReferenceParser: new JS.Class(Stake.Parser, {
    initialize: function(name) {
      this._name = name;
    },
    
    consume: function(input, session) {
      return session['_consume_' + this._name](input, session);
    }
  })
});

