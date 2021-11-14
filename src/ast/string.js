'use strict'

class String {
  constructor (text, value, ci) {
    this._text  = text
    this._value = value
    this._ci    = ci
  }

  compile (builder, address, action) {
    let value  = this._value,
        length = value.length,
        chunk  = builder.chunk_(length)

    let condition = this._ci
                  ? builder.stringMatchCI_(chunk, value)
                  : builder.stringMatch_(chunk, value)

    builder.if_(condition, () => {
      let of = builder.offset_()
      builder.syntaxNode_(address, of, of + ' + ' + length, null, action)
    }, () => {
      builder.failure_(address, this._text)
    })
  }
}

module.exports = String
