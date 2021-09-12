const jstest      = require("jstest").Test
const ParseHelper = require("./parse_helper")
const Choices     = require("../grammars/choices")

jstest.describe("choices", function() { with(this) {
  include(ParseHelper)

  describe("containing strings", function() { with(this) {
    it("parses any of the choice options", function() { with(this) {
      assertParse(["a", 12], Choices.parse("choice-abc: a"))
      assertParse(["b", 12], Choices.parse("choice-abc: b"))
      assertParse(["c", 12], Choices.parse("choice-abc: c"))
    }})

    it("rejects input matching none of the options", function() { with(this) {
      assertThrows(SyntaxError, () => Choices.parse("choice-abc: d"))
    }})

    it("rejects superstrings of the options", function() { with(this) {
      assertThrows(SyntaxError, () => Choices.parse("choice-abc: ab"))
    }})

    it("parses a choice as part of a sequence", function() { with(this) {
      assertParse(
        ["repeat", 12, [
          ["re", 12, []],
          ["peat", 14, []]
        ]],
        Choices.parse("choice-seq: repeat")
      )
    }})

    it("does not backtrack if later rules fail", function() { with(this) {
      assertThrows(SyntaxError, () => Choices.parse("choice-seq: reppeat"))
    }})
  }})

  describe("with repetition", function() { with(this) {
    it("parses a different option on each iteration", function() { with(this) {
      assertParse(
        ["abcabba", 12, [
          ["a", 12, []],
          ["b", 13, []],
          ["c", 14, []],
          ["a", 15, []],
          ["b", 16, []],
          ["b", 17, []],
          ["a", 18, []]
        ]],
        Choices.parse("choice-rep: abcabba")
      )
    }})

    it("rejects if any iteration does not match the options", function() { with(this) {
      assertThrows(SyntaxError, () => Choices.parse("choice-rep: abcadba"))
    }})
  }})
}})
