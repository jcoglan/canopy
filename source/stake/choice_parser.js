Stake.extend({
  ChoiceParser: new JS.Class(Stake.Parser, {
    extend: {
      create: function() {
        return new this(Array.prototype.slice.call(arguments));
      }
    },
    
    initialize: function(choices) {
      this._choices = choices;
    },
    
    consume: function(input, session) {
      var choices = this._choices,
          offset  = session.offset,
          n = choices.length, i, node;
      
      for (i = 0; i < n; i++) {
        session.offset = offset;
        if (node = choices[i].consume(input, session))
          return this._extendNode(node);
      }
      return null;
    }
  })
});

