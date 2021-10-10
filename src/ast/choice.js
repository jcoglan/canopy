'use strict'

class Choice {
  constructor (options) {
    this._options = options
  }

  [Symbol.iterator] () {
    return this._options[Symbol.iterator]()
  }

  compile (builder, address) {
    let startOffset = builder.localVar_('index', builder.offset_())
    this._compileChoices(builder, address, 0, startOffset)
  }

  _compileChoices (builder, address, index, startOffset) {
    if (index === this._options.length) return

    this._options[index].compile(builder, address)

    builder.unlessNode_(address, (builder) => {
      builder.assign_(builder.offset_(), startOffset)
      this._compileChoices(builder, address, index + 1, startOffset)
    }, this)
  }
}

module.exports = Choice
