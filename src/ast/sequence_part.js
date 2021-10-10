'use strict'

class SequencePart {
  constructor (expression, label, muted) {
    this._expression = expression
    this._label      = label
    this._muted      = muted
  }

  *[Symbol.iterator] () {
    yield this._expression
  }

  labels () {
    let labels = []
    if (this._label) labels.push(this._label)
    if (this._expression.refName) labels.push(this._expression.refName)
    return labels
  }

  muted () {
    return this._muted
  }

  compile (builder, address) {
    this._expression.compile(builder, address)
  }
}

module.exports = SequencePart
