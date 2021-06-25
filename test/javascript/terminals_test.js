const jstest      = require("jstest").Test
const ParseHelper = require("./parse_helper")
const Terminals   = require("../grammars/terminals")

jstest.describe("terminals", function() { with(this) {
  include(ParseHelper)

  describe("any char", function() { with(this) {
    it("parses any single character", function() { with(this) {
      assertParse( ["a", 5], Terminals.parse("any: a") )
      assertParse( ["!", 5], Terminals.parse("any: !") )
    }})

    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("any: "))
    }})

    it("rejects input with too many characters", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("any: ab"))
    }})
  }})

  describe("char class", function() { with(this) {
    it("parses characters within the class", function() { with(this) {
      assertParse( ["x", 11], Terminals.parse("pos-class: x") )
    }})

    it("rejects characters outside the class", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("pos-class: 0"))
    }})

    it("matches characters case-sensitively", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("pod-class: A"))
    }})

    it("parses characters outside a negative class", function() { with(this) {
      assertParse( ["0", 11], Terminals.parse("neg-class: 0"))
    }})

    it("rejects characters within a negative class", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("neg-class: x"))
    }})
  }})
}})
