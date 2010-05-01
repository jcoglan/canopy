Canopy.Parser.extend({
  Reference: new JS.Class(Canopy.Parser, {
    initialize: function(name) {
      this._name = this.label = name;
    },
    
    consume: function(input, session) {
      return this._extendNode(session['_consume_' + this._name](input));
    }
  })
});

