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
    
    _syntaxNode: function(textValue) {
      return {textValue: textValue};
    }
  })
});

Stake.extend({
  StringParser: new JS.Class(Stake.Parser, {
    initialize: function(string) {
      this._string = string;
    },
    
    parse: function(input) {
      if (input !== this._string) return null;
      return this._syntaxNode(input);
    }
  })
});

