"use strict"

const jstest = require("jstest")

module.exports = new jstest.Module({
  assertParse(tuple, { elements: [_, actual] }) {
    this.assertParseInner(tuple, actual)
  },

  assertParseElements(elems, actionArgs) {
    this.assertEqual(5, actionArgs.length)
    this.assertEqual(elems.length, actionArgs[4].length)

    for (let [i, elem] of elems.entries())
      this.assertParseInner(elem, actionArgs[4][i])
  },

  assertParseInner([text, offset, elements, labelled], actual) {
    this.assertEqual( text, actual.text )
    this.assertEqual( offset, actual.offset )

    if (elements) {
      this.assertEqual( elements.length, actual.elements.length )

      for (let [i, elem] of elements.entries())
        this.assertParseInner(elem, actual.elements[i])
    }

    if (labelled) {
      for (let key in labelled)
        this.assertParseInner(labelled[key], actual[key])
    }
  }
})
