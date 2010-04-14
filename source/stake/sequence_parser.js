Stake.extend({
  SequenceParser: new JS.Class(Stake.Parser, {
    extend: {
      create: function() {
        return new this(Array.prototype.slice.call(arguments));
      }
    },
    
    initialize: function(parsers) {
      this._parsers = parsers;
    },
    
    consume: function(input, offset) {
      var elements  = [],
          parsers   = this._parsers,
          textValue = '',
          counter   = offset,
          n = parsers.length, i, node;
      
      for (i = 0; i < n; i++) {
        node = parsers[i].consume(input, counter);
        if (!node) return null;
        
        elements.push(node);
        input = input.substring(node.textValue.length);
        
        textValue += node.textValue;
        counter   += node.textValue.length;
      }
      return this._syntaxNode(textValue, offset, elements);
    }
  })
});

