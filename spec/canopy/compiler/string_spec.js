var parseHelper = require('../../parse_helper'),
    jstest      = require('jstest').Test

jstest.describe("Compiler.String", function() { with(this) {
  include(parseHelper)

  before(function() { with(this) {
    parseHelper.compile('grammar global.StringTest \
      string <- "foo"')
  }})

  it('parses the string it contains', function() { with(this) {
    assertParse( ['foo', 0, []], StringTest.parse('foo') )
  }})

  it('does not parse other strings', function() { with(this) {
    assertThrows(Error, function() { StringTest.parse('FOO') })
    assertThrows(Error, function() { StringTest.parse('bar') })
  }})

  it('does not parse superstrings of itself', function() { with(this) {
    assertThrows(Error, function() { StringTest.parse('food') })
  }})

  it('does not parse the empty string', function() { with(this) {
    assertThrows(Error, function() { StringTest.parse('') })
  }})

  describe('single-quoted strings', function() { with(this) {
    before(function() { with(this) {
      parseHelper.compile("grammar global.SingleQuoteTest \
        string <- 'foo'")
    }})

    it('parses the string it contains', function() { with(this) {
      assertParse( ['foo', 0, []], SingleQuoteTest.parse('foo') )
    }})
  }})

  describe('case-insensitive strings', function() { with(this) {
    before(function() { with(this) {
      parseHelper.compile('grammar global.CIStringTest \
        string <- `foo`')
    }})

    it('parses the string it contains', function() { with(this) {
      assertParse( ['foo', 0, []], CIStringTest.parse('foo') )
      assertParse( ['FOO', 0, []], CIStringTest.parse('FOO') )
    }})
  }})

  describe('optional case-insensitive strings', function() { with(this) {
    before(function() { with(this) {
      parseHelper.compile('grammar global.CIStringTest \
        root <- string1 string2? \
        string1 <- "foo" \
        string2 <- `bar`')
    }})

    it('parses when absent', function() { with(this) {
      assertParse( ['foo', 0, []
                     ['foo', 0, []],
                     ['', 3, []]],
        CIStringTest.parse('foo') )
    }})
  }})
}})
