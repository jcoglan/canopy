'use strict';

var util = require('../util');

var Choice = function(options) {
  this._options = options;
};

util.assign(Choice.prototype, {
  forEach: function(callback, context) {
    this._options.forEach(callback, context);
  },

  compile: function(builder, address) {
    var startOffset = builder.localVar_('index', builder.offset_());
    this._compileChoices(builder, address, 0, startOffset);
  },

  _compileChoices: function(builder, address, index, startOffset) {
    if (index === this._options.length) return;

    this._options[index].compile(builder, address);

    builder.unlessNode_(address, function(builder) {
      builder.assign_(builder.offset_(), startOffset);
      this._compileChoices(builder, address, index + 1, startOffset);
    }, this);
  }
});

module.exports = Choice;
