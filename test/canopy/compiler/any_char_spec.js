var parseHelper = require('../../parse_helper'),
    jstest      = require('jstest').Test

jstest.describe("Compiler.AnyChar", function() { with(this) {
  include(parseHelper)

  before(function() { with(this) {
    parseHelper.compile('grammar global.AnyCharTest \
      anyChar <- .')
  }})

  it('parses a single character', function() { with(this) {
    assertParse( ['x', 0, []], AnyCharTest.parse('x') )
  }})

  it('does not parse the empty string', function() { with(this) {
    assertThrows(Error, function() { AnyCharTest.parse('') })
    assertEqual( {offset: 0, expected: ['<any char>']}, AnyCharTest.Parser.lastError )
  }})
}})
