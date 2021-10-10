'use strict'

class CharClass {
  constructor (text, regex) {
    this._text = text
    this.regex = regex
  }

  compile (builder, address, action) {
    let regex = this.constName || this.regex,
        chunk = builder.chunk_(1)

    builder.if_(builder.regexMatch_(regex, chunk), (builder) => {
      let of = builder.offset_()
      builder.syntaxNode_(address, of, of + ' + 1', null, action)
    }, (builder) => {
      builder.failure_(address, this._text)
    })
  }
}

module.exports = CharClass
