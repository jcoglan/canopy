Canopy.Compiler.Grammar = {
  grammarName: function() {
    return this.grammar_name.object_identifier.text
  },

  toSexp: function() {
    var sexp = ['grammar', this.grammarName()];
    this.rules.forEach(function(rule) {
      sexp.push(rule.grammar_rule.toSexp());
    });
    return sexp;
  },

  compile: function(builder) {
    var scan = function(node, callback, context) {
      callback.call(context, node);
      node.forEach(function(child) { scan(child, callback, context) });
    };

    builder.package_(this.grammarName(), function(builder) {
      var nodeClassName = builder.syntaxNodeClass_(),
          subclassIndex = 1;

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

      builder.grammarModule_(function(builder) {
        var regexName = 'REGEX_', regexIndex = 1;

        scan(this, function(node) {
          if (node.regex) builder.compileRegex_(node, regexName + (regexIndex++));
        });

        this.rules.forEach(function(rule) {
          rule.grammar_rule.compile(builder);
        });
      }, this);

      var root = this.rules.elements[0].grammar_rule.name();

      builder.parserClass_(root);
      builder.exports_();
    }, this);
  }
};
