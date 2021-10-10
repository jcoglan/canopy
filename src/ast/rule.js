'use strict'

class Rule {
  constructor (name, expression) {
    this.name        = name
    this._expression = expression
  }

  *[Symbol.iterator] () {
    yield this._expression
  }

  compile (builder, address) {
    builder.method_('_read_' + this.name, [], (builder) => {
      builder.cache_(this.name, (builder, address) => {
        this._expression.compile(builder, address)
      })
    })
  }
}

module.exports = Rule
