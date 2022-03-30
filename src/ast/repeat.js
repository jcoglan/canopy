'use strict'

class Repeat {
  constructor (expression, count) {
    this._expression = expression
    this._count      = count
  }

  *[Symbol.iterator] () {
    yield this._expression
  }

  compile (builder, address, action) {
    let temp = builder.localVars_({
          remaining: this._count,
          index:     builder.offset_(),
          elements:  builder.emptyList_(),
          address:   builder.true_()
        }),

        remaining   = temp.remaining,
        startOffset = temp.index,
        elements    = temp.elements,
        elAddr      = temp.address

    builder.loop_(() => {
      this._expression.compile(builder, elAddr)

      builder.ifNode_(elAddr, () => {
        builder.append_(elements, elAddr)
        builder.decrement_(remaining)
      }, () => {
        builder.break_()
      })
    })

    builder.if_(builder.isZero_(remaining), () => {
      builder.syntaxNode_(address, startOffset, builder.offset_(), elements, action)
    }, () => {
      builder.assign_(address, builder.nullNode_())
    })
  }
}

module.exports = Repeat
