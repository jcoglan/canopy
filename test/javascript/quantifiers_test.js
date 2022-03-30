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

    it("parses a repeated reference", function() { with(this) {
      assertParse(
        ["#abc123", 11, [
          ["#", 11, []],
          ["abc123", 12, [
            ["a", 12, []],
            ["b", 13, []],
            ["c", 14, []],
            ["1", 15, []],
            ["2", 16, []],
            ["3", 17, []]
          ]]
        ]],
        Quantifiers.parse("color-ref: #abc123")
      )
    }})

    it("parses a repeated choice", function() { with(this) {
      assertParse(
        ["#abc123", 14, [
          ["#", 14, []],
          ["abc123", 15, [
            ["a", 15, []],
            ["b", 16, []],
            ["c", 17, []],
            ["1", 18, []],
            ["2", 19, []],
            ["3", 20, []]
          ]]
        ]],
        Quantifiers.parse("color-choice: #abc123")
      )
    }})
  }})

  describe("rep-exact", function() { with(this) {
    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-exact: "))
    }})

    it("parses the required number of the pattern", function() { with(this) {
      assertParse(
        ["abc", 11, [
          ["a", 11, []],
          ["b", 12, []],
          ["c", 13, []]
        ]],
        Quantifiers.parse("rep-exact: abc")
      )
    }})

    it("rejects too few copies of the pattern", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-exact: ab"))
    }})

    it("rejects too many copies of the pattern", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-exact: abcd"))
    }})
  }})

  describe("rep-min", function() { with(this) {
    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-min: "))
    }})

    it("parses the minimum number of the pattern", function() { with(this) {
      assertParse(
        ["abc", 9, [
          ["a", 9, []],
          ["b", 10, []],
          ["c", 11, []]
        ]],
        Quantifiers.parse("rep-min: abc")
      )
    }})

    it("parses more copies of the pattern", function() { with(this) {
      assertParse(
        ["abcdef", 9, [
          ["a", 9, []],
          ["b", 10, []],
          ["c", 11, []],
          ["d", 12, []],
          ["e", 13, []],
          ["f", 14, []]
        ]],
        Quantifiers.parse("rep-min: abcdef")
      )
    }})

    it("rejects too few copies of the pattern", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-min: ab"))
    }})
  }})

  describe("rep-range", function() { with(this) {
    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-range: "))
    }})

    it("parses the minimum number of the pattern", function() { with(this) {
      assertParse(
        ["abc", 11, [
          ["a", 11, []],
          ["b", 12, []],
          ["c", 13, []]
        ]],
        Quantifiers.parse("rep-range: abc")
      )
    }})

    it("parses the maximum number of the pattern", function() { with(this) {
      assertParse(
        ["abcde", 11, [
          ["a", 11, []],
          ["b", 12, []],
          ["c", 13, []],
          ["d", 14, []],
          ["e", 15, []]
        ]],
        Quantifiers.parse("rep-range: abcde")
      )
    }})

    it("rejects too few copies of the pattern", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-range: ab"))
    }})

    it("rejects too many copies of the pattern", function() { with(this) {
      assertThrows(SyntaxError, () => Quantifiers.parse("rep-range: abcdef"))
    }})
  }})
}})
