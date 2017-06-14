'use strict';

var util = require('../util');

var Sequence = function(parts) {
  this._parts = parts;
};

util.assign(Sequence.prototype, {
  toSexp: function() {
    var parts = this._parts.map(function(p) { return p.toSexp() });
    return ['sequence'].concat(parts);
  },

  forEach: function(callback, context) {
    this._parts.forEach(callback, context);
  },

  countUnmuted: function() {
    return this._parts.filter(function(p) { return !p.muted() }).length;
  },

  collectLabels: function(subclassName) {
    var result = this._parts.reduce(function(state, part) {
      if (part.muted()) return state;

      part.labels().forEach(function(label) { state[0][label] = state[1] });

      return [state[0], state[1] + 1];
    }, [{}, 0]);

    var labels = result[0];
    if (Object.keys(labels).length === 0) return null;

    this._nodeClassName = subclassName;
    return labels;
  },

  compile: function(builder, address, action) {
    var temp = builder.localVars_({
      index:    builder.offset_(),
      elements: builder.emptyList_(this.countUnmuted())
    });

    var startOffset = temp.index,
        elements    = temp.elements;

    this._compileExpressions(builder, 0, 0, startOffset, elements);

    builder.ifNull_(elements, function(builder) {
      builder.assign_(address, builder.nullNode_());
    }, function(builder) {
      builder.syntaxNode_(address, startOffset, builder.offset_(), elements, action, this._nodeClassName);
    }, this);
  },

  _compileExpressions: function(builder, index, elIndex, startOffset, elements) {
    if (index === this._parts.length) return;

    var expAddr = builder.localVar_('address'),
        expr    = this._parts[index],
        muted   = expr.muted();

    expr.compile(builder, expAddr);

    builder.ifNode_(expAddr, function(builder) {
      if (!muted) {
        builder.append_(elements, expAddr, elIndex);
        elIndex += 1;
      }
      this._compileExpressions(builder, index + 1, elIndex, startOffset, elements);
    }, function(builder) {
      builder.assign_(elements, builder.null_());
      builder.assign_(builder.offset_(), startOffset);
    }, this);
  }
});

module.exports = Sequence;
