Stake.extend({
  RepeatParser: new JS.Class(Stake.Parser, {
    extend: {
      create: function(minimum, parser) {
        return new this(parser, minimum);
      }
    },
    
    initialize: function(parser, minimum) {
      this._parser  = parser;
      this._minimum = minimum || 0;
    },
    
    consume: function(input, offset) {
      var elements  = [],
          textValue = '',
          counter   = offset,
          remaining = this._minimum,
          node      = true;
      
      while (node = this._parser.consume(input, counter)) {
        elements.push(node);
        input = input.substring(node.textValue.length);
        textValue += node.textValue;
        counter   += node.textValue.length;
        remaining -= 1;
      }
      if (remaining > 0) return null;
      return this._syntaxNode(textValue, offset, elements);
    }
  })
});

