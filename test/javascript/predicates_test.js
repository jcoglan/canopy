const jstest      = require("jstest").Test
const ParseHelper = require("./parse_helper")
const Predicates   = require("../grammars/predicates")

jstest.describe("predicates", function() { with(this) {
  include(ParseHelper)

  describe("positive look-ahead", function() { with(this) {
    it("checks the first character of a word", function() { with(this) {
      assertParse(
        ["London", 10, [
          ["", 10, []],
          ["London", 10, [
            ["L", 10, []],
            ["o", 11, []],
            ["n", 12, []],
            ["d", 13, []],
            ["o", 14, []],
            ["n", 15, []]
          ]]
        ]],
        Predicates.parse("pos-name: London")
      )
    }})

    it("rejects words where the predicate does not match", function() { with(this) {
      assertThrows(SyntaxError, () => Predicates.parse("pos-name: london"))
    }})

    it("resets the cursor after matching", function() { with(this) {
      assertParse(
        ["<abc123>", 9, [
          ["", 9, []],
          ["<", 9, []],
          ["abc123", 10, [
            ["a", 10, []],
            ["b", 11, []],
            ["c", 12, []],
            ["1", 13, []],
            ["2", 14, []],
            ["3", 15, []]
          ]],
          [">", 16, []]
        ]],
        Predicates.parse("pos-seq: <abc123>")
      )
    }})

    it("uses a reference as a predicate", function() { with(this) {
      assertParse(
        ["c99", 9, [
          ["", 9, []],
          ["c99", 9, [
            ["c", 9, []],
            ["9", 10, []],
            ["9", 11, []]
          ]]
        ]],
        Predicates.parse("pos-ref: c99")
      )
    }})
  }})

  describe("negative look-ahead", function() { with(this) {
    it("checks the first character of a word", function() { with(this) {
      assertParse(
        ["word", 10, [
          ["", 10, []],
          ["word", 10, [
            ["w", 10, []],
            ["o", 11, []],
            ["r", 12, []],
            ["d", 13, []]
          ]]
        ]],
        Predicates.parse("neg-name: word")
      )
    }})

    it("rejects words where the predicate matches", function() { with(this) {
      assertThrows(SyntaxError, () => Predicates.parse("neg-name: Word"))
    }})

    it("checks for a string at the end", function() { with(this) {
      assertParse(
        ["word", 14, [
          ["word", 14, []],
          ["", 18, []]
        ]],
        Predicates.parse("neg-tail-str: word")
      )
    }})

    it("checks for a class at the end", function() { with(this) {
      assertParse(
        ["word", 16, [
          ["word", 16, []],
          ["", 20, []]
        ]],
        Predicates.parse("neg-tail-class: word")
      )
    }})

    it("checks for any char at the end", function() { with(this) {
      assertParse(
        ["word", 14, [
          ["word", 14, []],
          ["", 18, []]
        ]],
        Predicates.parse("neg-tail-any: word")
      )
    }})

    it("rejects inputs that match the negative pattern", function() { with(this) {
      assertThrows(SyntaxError, () => Predicates.parse("neg-tail-str: wordmore text"))
      assertThrows(SyntaxError, () => Predicates.parse("neg-tail-class: words"))
      assertThrows(SyntaxError, () => Predicates.parse("neg-tail-any: word "))
    }})
  }})
}})
