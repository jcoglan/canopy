'use strict';

var util = require('../util');

module.exports = {
  expressions: function() {
    if (this._expressions) return this._expressions;
    this._expressions = [this.first_part];
    this.rest.forEach(function(part) {
      this._expressions.push(part.expression);
    }, this);
    return this._expressions;
  },

  toSexp: function() {
    var sexp = ['sequence'];
    util.forEach(this.expressions(), function(expression) {
      sexp.push(expression.toSexp());
    });
    return sexp;
  },

  collectLabels: function(subclassName) {
    var expressions = this.expressions(),
        labels      = {},
        anyLabels   = false,
        k           = 0,
        exprLabels, i, j, m, n;

    for (i = 0, n = expressions.length; i < n; i++) {
      exprLabels = expressions[i].labels();
      if (exprLabels.length > 0) {
        anyLabels = true;
        for (j = 0, m = exprLabels.length; j < m; j++)
          labels[exprLabels[j]] = k;
      }
      if (!expressions[i].muted()) k += 1;
    }

    if (anyLabels) {
      this._nodeClassName = subclassName;
      return labels;
    } else {
      return null;
    }
  },

  countUnmuted: function() {
    var expressions = this.expressions(),
        count       = 0,
        i, n;

    for (i = 0, n = expressions.length; i < n; i++) {
      if (!expressions[i].muted()) count += 1;
    }

    return count;
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
    var expressions = this.expressions();
    if (index === expressions.length) return;

    var expAddr = builder.localVar_('address'),
        expr    = expressions[index],
        muted   = expr.muted();

    expr.compile(builder, expAddr);

    builder.ifNode_(expAddr, function(builder) {
      if (!muted) builder.append_(elements, expAddr, elIndex);
      this._compileExpressions(builder, index + 1, elIndex + (muted ? 0 : 1), startOffset, elements);
    }, function(builder) {
      builder.assign_(elements, builder.null_());
      builder.assign_(builder.offset_(), startOffset);
    }, this);
  }
};
