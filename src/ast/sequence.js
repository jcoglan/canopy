'use strict'

class Sequence {
  constructor (parts) {
    this._parts = parts
  }

  [Symbol.iterator] () {
    return this._parts[Symbol.iterator]()
  }

  countUnmuted () {
    return this._parts.filter((p) => !p.muted()).length
  }

  collectLabels () {
    let result = this._parts.reduce((state, part) => {
      if (part.muted()) return state

      let [offsets, index] = state

      for (let label of part.labels()) {
        offsets[label] = index
      }
      return [offsets, index + 1]
    }, [{}, 0])

    let [labels] = result
    if (Object.keys(labels).length === 0) return null

    return labels
  }

  setNodeClassName (className) {
    this._nodeClassName = className
  }

  compile (builder, address, action) {
    let temp = builder.localVars_({
      index:    builder.offset_(),
      elements: builder.emptyList_(this.countUnmuted())
    })

    let startOffset = temp.index,
        elements    = temp.elements,
        klass       = this._nodeClassName

    this._compileExpressions(builder, 0, 0, startOffset, elements)

    builder.ifNull_(elements, () => {
      builder.assign_(address, builder.nullNode_())
    }, () => {
      builder.syntaxNode_(address, startOffset, builder.offset_(), elements, action, klass)
    })
  }

  _compileExpressions (builder, index, elIndex, startOffset, elements) {
    let expAddr = builder.localVar_('address'),
        expr    = this._parts[index],
        muted   = expr.muted()

    expr.compile(builder, expAddr)

    builder.ifNode_(expAddr, () => {
      if (!muted) {
        builder.append_(elements, expAddr, elIndex)
        elIndex += 1
      }
      if (index < this._parts.length - 1) {
        this._compileExpressions(builder, index + 1, elIndex, startOffset, elements)
      } else if (muted) {
        builder.pass_()
      }
    }, () => {
      builder.assign_(elements, builder.null_())
      builder.assign_(builder.offset_(), startOffset)
    })
  }
}

module.exports = Sequence
