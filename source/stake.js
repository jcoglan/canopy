this.Stake = this.Stake || new JS.Module('Stake');

Stake.extend({
  map: function(list, block, context) {
    var results = [], n = list.length, i;
    for (i = 0; i < n; i++)
      results.push(block.call(context, list[i]));
    return results;
  },
  
  Parser: new JS.Class({
    extend: {
      fromSexp: function(sexp) {
        if (!(sexp instanceof Array)) return sexp;
        var components = Stake.map(sexp, this.fromSexp, this),
            type = components.shift() + '-parser';
        
        type = type.replace(/(^.|-.)/g, function(m) {
          return m.replace('-', '').toUpperCase();
        });
        
        var klass = Stake[type];
        return klass.create.apply(klass, components);
      },
      
      create: function(arg) {
        return new this(arg);
      }
    },
    
    _begins: function(input, matcher) {
      return input.substring(0,matcher.length) === matcher;
    },
    
    _syntaxNode: function(textValue, offset, elements) {
      return {textValue: textValue, offset: offset, elements: elements || []};
    },
    
    parse: function(input) {
      var node = this.consume(input, 0);
      if (!node) return null;
      return (node.textValue === input) ? node : null;
    }
  })
});

Stake.extend({
  AnyCharParser: new JS.Class(Stake.Parser, {
    consume: function(input, offset) {
      if (input === '') return null;
      return this._syntaxNode(input.substring(0,1), offset);
    }
  }),
  
  CharClassParser: new JS.Class(Stake.Parser, {
    initialize: function(charClass) {
      this._charClass = charClass;
      this._pattern = new RegExp('^' + charClass);
    },
    
    consume: function(input, offset) {
      var match = input.match(this._pattern);
      return match ? this._syntaxNode(String(match), offset) : null;
    }
  }),
  
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
  }),
  
  MaybeParser: new JS.Class(Stake.Parser, {
    initialize: function(parser) {
      this._parser = parser;
    },
    
    consume: function(input, offset) {
      var node = this._parser.consume(input, offset);
      return node || this._syntaxNode('', offset);
    }
  }),
  
  NotParser: new JS.Class(Stake.Parser, {
    initialize: function(parser) {
      this._parser = parser;
    },
    
    consume: function(input, offset) {
      var node = this._parser.consume(input, offset);
      return node ? null : this._syntaxNode('', offset);
    }
  }),
  
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
  }),
  
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
  }),
  
  StringParser: new JS.Class(Stake.Parser, {
    initialize: function(string) {
      this._string = string;
    },
    
    consume: function(input, offset) {
      if (!this._begins(input, this._string)) return null;
      return this._syntaxNode(this._string, offset);
    }
  })
});

