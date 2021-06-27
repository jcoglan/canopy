const jstest      = require("jstest").Test
const ParseHelper = require("./parse_helper")
const Quantifiers = require("../grammars/quantifiers")

jstest.describe("quantifiers", function() { with(this) {
  include(ParseHelper)

  describe("maybe", function() { with(this) {
    it("parses a matching character", function() { with(this) {
      assertParse( ["4", 7, []], Quantifiers.parse("maybe: 4") )
    }})

    it("parses the empty string", function() { with(this) {
      assertParse( ["", 7, []], Quantifiers.parse("maybe: ") )
    }})

    it("rejects a non-matching character", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("maybe: a"))
    }})
  }})
}})
