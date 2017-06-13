'use strict';

var util = require('../util');

var String = function(text, value, ci) {
  this._text  = text;
  this._value = value;
  this._ci    = ci;
};

util.assign(String.prototype, {
  toSexp: function() {
    var type = this._ci ? 'ci-string' : 'string';
    return [type, this._value];
  },

  compile: function(builder, address, action) {
    var value  = this._value,
        length = value.length,
        chunk  = builder.chunk_(length);

    var condition = this._ci
                  ? builder.stringMatchCI_(chunk, value)
                  : builder.stringMatch_(chunk, value);

    builder.if_(condition, function(builder) {
      var of = builder.offset_();
      builder.syntaxNode_(address, of, of + ' + ' + length, null, action);
    }, function(builder) {
      builder.failure_(address, this._text);
    }, this);
  }
});

module.exports = String;
