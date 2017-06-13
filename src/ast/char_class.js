'use strict';

var util = require('../util');

var CharClass = function(text, regex) {
  this._text = text;
  this.regex = regex;
};

util.assign(CharClass.prototype, {
  toSexp: function() {
    return ['char-class', this._text];
  },

  compile: function(builder, address, action) {
    var regex = this.constName || this.regex,
        chunk = builder.chunk_(1);

    builder.if_(builder.regexMatch_(regex, chunk), function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of + ' + 1', null, action);
    }, function(builder) {
      builder.failure_(address, this._text);
    }, this);
  }
});

module.exports = CharClass;
