Stake.extend({
  GrammarParser: new JS.Class(Stake.Parser, {
    extend: {
      create: function() {
        var args = Array.prototype.slice.call(arguments);
        return new this(args.shift(), args);
      },
      
      moduleFromRules: function(rules) {
        var module = new JS.Module(),
            i = rules.length;
        
        while (i--)
          (function(rule) {
            module.define('_consume_' + rule.label, function(input) {
              var cache = this._cache,
                  label = rule.label,
                  store = cache[label] = cache[label] || {};
              
              return store[this.offset] = store[this.offset] || rule.consume(input, this);
            });
          })(rules[i]);
        
        return module;
      }
    },
    
    initialize: function(name, rules) {
      this._name  = name;
      this._rules = rules;
      this._root  = rules[0];
      
      this._module = this.klass.moduleFromRules(rules);
      
      this._sessionClass = new JS.Class({
        initialize: function() {
          this.offset = 0;
          this._cache = {};
        }
      });
      this._sessionClass.include(this._module);
    },
    
    createSession: function() {
      return new this._sessionClass();
    },
    
    consume: function(input, offset) {
      return this._root.consume(input, offset);
    }
  })
});

