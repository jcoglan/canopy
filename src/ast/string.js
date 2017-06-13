'use strict';

var util = require('../util');

var String = function(text) {
  this._text  = text;
  this._value = eval(text);
};

util.assign(String.prototype, {
  toSexp: function() {
    return ['string', this._value];
  },

  compile: function(builder, address, action) {
    var value  = this._value,
        length = value.length,
        chunk  = builder.chunk_(length);

    builder.if_(builder.stringMatch_(chunk, value), function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of + ' + ' + length, null, action);
    }, function(builder) {
      builder.failure_(address, this._text);
    }, this);
  }
});

module.exports = String;
