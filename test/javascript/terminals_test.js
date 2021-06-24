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
  }})
}})
