'use strict';

var util = require('../util');

var Grammar = function(name, rules) {
  this._name  = name;
  this._rules = rules;
};

util.assign(Grammar.prototype, {
  toSexp: function() {
    var rules = this._rules.map(function(r) { return r.toSexp() });
    return ['grammar', this._name].concat(rules);
  },

  forEach: function(callback, context) {
    this._rules.forEach(callback, context);
  },

  compile: function(builder) {
    var scan = function(node, callback, context) {
      callback.call(context, node);
      if (node.forEach)
        node.forEach(function(child) { scan(child, callback, context) });
    };

    builder.package_(this._name, function(builder) {
      var actions = [];
      scan(this, function(node) {
        if (node._actionName) {
          actions.push(node._actionName);
        }
      });

      var nodeClassName = builder.syntaxNodeClass_(), subclassIndex = 1;
      scan(this, function(node) {
        var subclassName = nodeClassName + subclassIndex,
            labels = node.collectLabels && node.collectLabels(subclassName);

        if (!labels) return;

        builder.class_(subclassName, nodeClassName, function(builder) {
          var keys = [];
          for (var key in labels) keys.push(key);
          builder.attributes_(keys);
          builder.constructor_(['text', 'offset', 'elements'], function(builder) {
            for (var key in labels)
              builder.attribute_(key, builder.arrayLookup_('elements', labels[key]));
          });
        });
        subclassIndex += 1;
      });

      builder.grammarModule_(actions.sort(), function(builder) {
        var regexName = 'REGEX_', regexIndex = 1;
        scan(this, function(node) {
          if (node.regex) builder.compileRegex_(node, regexName + (regexIndex++));
        });

        this._rules.forEach(function(rule) { rule.compile(builder) });
      }, this);

      var root = this._rules[0].name;

      builder.parserClass_(root);
      builder.exports_();
    }, this);
  }
});

module.exports = Grammar;
