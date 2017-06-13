'use strict';

module.exports = {
  name: function() {
    return this.identifier.text;
  },

  toSexp: function() {
    return ['rule', this.name(), this.parsing_expression.toSexp()];
  },

  compile: function(builder) {
    var name = this.name();

    builder.method_('_read_' + name, [], function(builder) {
      builder.cache_(name, function(builder, address) {
        this.parsing_expression.compile(builder, address);
      }, this);
    }, this);
  }
};
