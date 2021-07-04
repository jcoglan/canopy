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

  describe("rep-0", function() { with(this) {
    it("parses the empty string", function() { with(this) {
      assertParse( ["", 7, []], Quantifiers.parse("rep-0: ") )
    }})

    it("parses one occurence of the pattern", function() { with(this) {
      assertParse(
        ["z", 7, [
          ["z", 7, []]
        ]],
        Quantifiers.parse("rep-0: z")
      )
    }})

    it("parses many occurences of the same instance of the pattern", function() { with(this) {
      assertParse(
        ["zzzz", 7, [
          ["z", 7, []],
          ["z", 8, []],
          ["z", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-0: zzzz")
      )
    }})

    it("parses many occurences of different instances of the pattern", function() { with(this) {
      assertParse(
        ["wxyz", 7, [
          ["w", 7, []],
          ["x", 8, []],
          ["y", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-0: wxyz")
      )
    }})

    it("rejects strings with a non-matching prefix", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-0: 4x"))
    }})

    it("rejects strings with a non-matching suffix", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-0: x4"))
    }})

    it("parses repeating patterns greedily", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("greedy-0: xy"))
    }})
  }})

  describe("rep-1", function() { with(this) {
    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-1: "))
    }})

    it("parses one occurence of the pattern", function() { with(this) {
      assertParse(
        ["z", 7, [
          ["z", 7, []]
        ]],
        Quantifiers.parse("rep-1: z")
      )
    }})

    it("parses many occurences of the same instance of the pattern", function() { with(this) {
      assertParse(
        ["zzzz", 7, [
          ["z", 7, []],
          ["z", 8, []],
          ["z", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-1: zzzz")
      )
    }})

    it("parses many occurences of different instances of the pattern", function() { with(this) {
      assertParse(
        ["wxyz", 7, [
          ["w", 7, []],
          ["x", 8, []],
          ["y", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-1: wxyz")
      )
    }})

    it("rejects strings with a non-matching prefix", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-1: 4x"))
    }})

    it("rejects strings with a non-matching suffix", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-1: x4"))
    }})

    it("parses repeating patterns greedily", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("greedy-1: xy"))
    }})
  }})
}})
