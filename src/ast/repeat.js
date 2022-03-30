'use strict'

class Repeat {
  constructor (expression, range) {
    this._expression = expression
    this._range      = range
  }

  *[Symbol.iterator] () {
    yield this._expression
  }

  compile (builder, address, action) {
    let temp = builder.localVars_({
          index:     builder.offset_(),
          elements:  builder.emptyList_(),
          address:   builder.null_()
        }),

        startOffset = temp.index,
        elements    = temp.elements,
        elAddr      = temp.address

    builder.loop_(() => {
      this._expression.compile(builder, elAddr)

      builder.ifNode_(elAddr, () => {
        builder.append_(elements, elAddr)
      }, () => {
        builder.break_()
      })
    })

    builder.if_(builder.sizeInRange_(elements, this._range), () => {
      builder.syntaxNode_(address, startOffset, builder.offset_(), elements, action)
    }, () => {
      builder.assign_(address, builder.nullNode_())
    })
  }
}

module.exports = Repeat
