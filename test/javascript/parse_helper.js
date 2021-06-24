"use strict"

const jstest = require("jstest")

module.exports = new jstest.Module({
  assertParse(tuple, { elements: [_, actual] }) {
    this.assertParseInner(tuple, actual)
  },

  assertParseInner([text, offset], actual) {
    this.assertEqual( text, actual.text )
    this.assertEqual( offset, actual.offset )
  }
})
