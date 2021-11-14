'use strict'

class AnyChar {
  compile (builder, address, action) {
    builder.if_(builder.hasChars_(), () => {
      let of = builder.offset_()
      builder.syntaxNode_(address, of, of + ' + 1', null, action)
    }, () => {
      builder.failure_(address, '<any char>')
    })
  }
}

module.exports = AnyChar
