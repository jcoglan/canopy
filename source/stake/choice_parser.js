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
    
    consume: function(input, offset) {
      var choices = this._choices,
          n = choices.length, i, node;
      
      for (i = 0; i < n; i++) {
        if (node = choices[i].consume(input, offset))
          return node;
      }
      return null;
    }
  })
});

