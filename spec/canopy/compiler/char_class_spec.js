var parseHelper = require('../../parse_helper'),
    jstest      = require('jstest').Test

jstest.describe("Compiler.CharClass", function() { with(this) {
  include(parseHelper)

  describe('positive', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.PositiveCharClassTest \
        charClass <- [a-z]')
    }})

    it('parses characters within the class', function() { with(this) {
      assertParse( ['a', 0, []], PositiveCharClassTest.parse('a') )
    }})

    it('does not parse characters outside the class', function() { with(this) {
      assertThrows(Error, function() { PositiveCharClassTest.parse('7') })
      assertEqual( {offset: 0, expected: ['[a-z]']}, PositiveCharClassTest.Parser.lastError )
    }})

    it('does not parse characters within the class appearing too late', function() { with(this) {
      assertThrows(Error, function() { PositiveCharClassTest.parse('7a') })
      assertEqual( {offset: 0, expected: ['[a-z]']}, PositiveCharClassTest.Parser.lastError )
    }})
  }})

  describe('negative', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.NegativeCharClassTest \
        charClass <- [^a-z]')
    }})

    it('parses characters within the class', function() { with(this) {
      assertParse( ['7', 0, []], NegativeCharClassTest.parse('7') )
    }})

    it('does not parse characters outside the class', function() { with(this) {
      assertThrows(Error, function() { NegativeCharClassTest.parse('a') })
    }})

    it('does not parse characters within the class appearing too late', function() { with(this) {
      assertThrows(Error, function() { NegativeCharClassTest.parse('a7') })
    }})
  }})

  describe('with sequencing and repetition', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.RepeatCharClassTest \
        root <- [1-9] [0-9]*')
    }})

    it('parses integers', function() { with(this) {
      assertParse(['3718', 0, [
                    ['3', 0, []],
                    ['718', 1, [
                      ['7', 1, []],
                      ['1', 2, []],
                      ['8', 3, []]]]]],

        RepeatCharClassTest.parse('3718') )
    }})

    it('does not parse floats', function() { with(this) {
      assertThrows(Error, function() { RepeatCharClassTest.parse('7.4') })
      assertEqual( {offset: 1, expected: ['[0-9]']}, RepeatCharClassTest.Parser.lastError )
    }})

    it('does not parse octal', function() { with(this) {
      assertThrows(Error, function() { RepeatCharClassTest.parse('0644') })
    }})
  }})
}})
