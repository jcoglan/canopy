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

  describe("single quoted strings", function() { with(this) {
    it("parses that exact string", function() { with(this) {
      assertParse( ["oat", 7], Terminals.parse("str-1: oat"))
    }})

    it("matches strings case-sensitively", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-1: OAT"))
    }})

    it("rejects strings with additional prefixes", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-1: boat"))
    }})

    it("rejects strings with additional suffixes", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-1: oath"))
    }})

    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-1: "))
    }})

    it("rejects prefixes of the target string", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-1: oa"))
    }})
  }})

  describe("double quoted strings", function() { with(this) {
    it("parses that exact string", function() { with(this) {
      assertParse( ["oat", 7], Terminals.parse("str-2: oat"))
    }})

    it("matches strings case-sensitively", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-2: OAT"))
    }})

    it("rejects strings with additional prefixes", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-2: boat"))
    }})

    it("rejects strings with additional suffixes", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-2: oath"))
    }})

    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-2: "))
    }})

    it("rejects prefixes of the target string", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-2: oa"))
    }})
  }})

  describe("case insensitive strings", function() { with(this) {
    it("parses that exact string", function() { with(this) {
      assertParse( ["oat", 8], Terminals.parse("str-ci: oat"))
    }})

    it("matches strings case-insensitively", function() { with(this) {
      assertParse( ["OAT", 8], Terminals.parse("str-ci: OAT"))
    }})

    it("rejects strings with additional prefixes", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-ci: boat"))
    }})

    it("rejects strings with additional suffixes", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-ci: oath"))
    }})

    it("rejects the empty string", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-ci: "))
    }})

    it("rejects prefixes of the target string", function() { with(this) {
      assertThrows(SyntaxError, () => Terminals.parse("str-ci: oa"))
    }})
  }})
}})
