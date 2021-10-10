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

  collectLabels (subclassName) {
    let result = this._parts.reduce((state, part) => {
      if (part.muted()) return state

      for (let label of part.labels()) {
        state[0][label] = state[1]
      }
      return [state[0], state[1] + 1]
    }, [{}, 0])

    let labels = result[0]
    if (Object.keys(labels).length === 0) return null

    this._nodeClassName = subclassName
    return labels
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

    builder.ifNull_(elements, (builder) => {
      builder.assign_(address, builder.nullNode_())
    }, (builder) => {
      builder.syntaxNode_(address, startOffset, builder.offset_(), elements, action, klass)
    })
  }

  _compileExpressions (builder, index, elIndex, startOffset, elements) {
    if (index === this._parts.length) return

    let expAddr = builder.localVar_('address'),
        expr    = this._parts[index],
        muted   = expr.muted()

    expr.compile(builder, expAddr)

    builder.ifNode_(expAddr, (builder) => {
      if (!muted) {
        builder.append_(elements, expAddr, elIndex)
        elIndex += 1
      }
      this._compileExpressions(builder, index + 1, elIndex, startOffset, elements)
    }, (builder) => {
      builder.assign_(elements, builder.null_())
      builder.assign_(builder.offset_(), startOffset)
    }, this)
  }
}

module.exports = Sequence
