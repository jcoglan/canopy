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
    
    consume: function(input, session) {
      var elements  = [],
          textValue = '',
          offset    = session.offset,
          remaining = this._minimum,
          node      = true;
      
      while (node = this._parser.consume(input, session)) {
        elements.push(node);
        input = input.substring(node.textValue.length);
        textValue      += node.textValue;
        session.offset  = offset + textValue.length;
        remaining      -= 1;
      }
      if (remaining > 0) return null;
      return this._syntaxNode(textValue, offset, elements);
    }
  })
});

