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
    builder.package_(this.grammarName(), function(builder) {
      var nodeClassName = builder.syntaxNodeClass_(),
          subclassIndex = 1;

      var scan = function(node) {
        var subclassName = nodeClassName + subclassIndex,
            labels = node.collectLabels && node.collectLabels(subclassName);

        if (labels) {
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
        }
        node.forEach(scan, this);
      };
      scan.call(this, this);

      builder.grammarModule_(function(builder) {
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
