'use strict';

module.exports = {
  toSexp: function() {
    return ['ci-string', this.stringValue()];
  },

  compile: function(builder, address, action) {
    var string = this.stringValue(),
        length = string.length,
        chunk  = builder.chunk_(length);

    builder.if_(builder.stringMatchCI_(chunk, string), function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of + ' + ' + length, null, action);
    }, function(builder) {
      builder.failure_(address, this.text);
    }, this);
  },

  stringValue: function() {
    var string = '"' + this.elements[1].text + '"';
    return eval(string);
  }
};
