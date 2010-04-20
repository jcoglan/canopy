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
      ALIASES: {
        rule: 'label'
      },
      
      fromSexp: function(sexp) {
        if (!(sexp instanceof Array)) return sexp;
        var components = Stake.map(sexp, this.fromSexp, this),
            type = components.shift();
        
        type = this.ALIASES[type] || type;
        
        type = (type + '-parser').replace(/(^.|-.)/g, function(m) {
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
    
    _syntaxNode: function(textValue, offset, elements, properties) {
      var node = {textValue: textValue, offset: offset, elements: elements || []};
      return JS.extend(node, properties);
    },
    
    parse: function(input) {
      var node = this.consume(input, this.createSession());
      if (!node) return null;
      return (node.textValue === input) ? node : null;
    },
    
    createSession: function() {
      return {offset: 0};
    }
  })
});

