this.Stake = this.Stake || new JS.Module('Stake');

Stake.extend({
  map: function(list, block, context) {
    var results = [], n = list.length, i;
    for (i = 0; i < n; i++)
      results.push(block.call(context, list[i]));
    return results;
  },
  
  getObject: function(name) {
    var parts  = name.split('.'),
        object = this.ENV,
        part;
    
    while (part = parts.shift())
      object = object && object[part];
    
    return object;
  },
  
  ENV: this,
  
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
      var custom = this.nodeClass && Stake.getObject(this.nodeClass),
          klass  = (custom instanceof Function) ? custom : Stake.SyntaxNode,
          node   = new klass(textValue, offset, elements, properties);
      
      if (!custom || custom instanceof Function) return node;
      node.extend(custom);
      return node;
    },
    
    parse: function(input) {
      var node = this.consume(input, this.createSession());
      if (!node) return null;
      return (node.textValue === input) ? node : null;
    },
    
    createSession: function() {
      return {offset: 0};
    }
  }),
  
  SyntaxNode: new JS.Class({
    initialize: function(textValue, offset, elements, properties) {
      this.textValue = textValue;
      this.offset    = offset;
      this.elements  = elements || [];
      this.extend(properties);
    }
  })
});

