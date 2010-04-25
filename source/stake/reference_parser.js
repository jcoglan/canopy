Stake.extend({
  ReferenceParser: new JS.Class(Stake.Parser, {
    initialize: function(name) {
      this._name = this.label = name;
    },
    
    consume: function(input, session) {
      return this._extendNode(session['_consume_' + this._name](input));
    }
  })
});

