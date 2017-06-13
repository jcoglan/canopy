var parseHelper = require('../../parse_helper'),
    jstest      = require('jstest').Test

jstest.describe("Compiler.Repeat", function() { with(this) {
  include(parseHelper)

  describe('maybe', function() { with(this) {
    before(function() { with(this) {
      parseHelper.compile('grammar global.MaybeTest \
        maybe <- "jc"?')
    }})

    it('parses if its pattern is present', function() { with(this) {
      assertParse( ['jc', 0, []], MaybeTest.parse('jc') )
    }})

    it('parses if no input is given', function() { with(this) {
      assertParse( ['', 0, []], MaybeTest.parse('') )
    }})

    it('does not parse if different input is given', function() { with(this) {
      assertThrows(Error, function() { MaybeTest.parse('gc') })
    }})
  }})

  describe('with zero minimum occurences', function() { with(this) {
    before(function() { with(this) {
      parseHelper.compile('grammar global.ZeroOrMoreTest \
        root <- "foo"*')
    }})

    it('matches zero occurences of the pattern', function() { with(this) {
      assertParse( ['', 0, []], ZeroOrMoreTest.parse('') )
    }})

    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],

        ZeroOrMoreTest.parse('foo') )
    }})

    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],

        ZeroOrMoreTest.parse('foofoofoo') )
    }})

    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertThrows(Error, function() { ZeroOrMoreTest.parse('foofood') })
    }})

    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        parseHelper.compile('grammar global.ZeroOrUnparsable \
          root <- "foo"* "foo"')
      }})

      it('does not parse any number of occurences', function() { with(this) {
        assertThrows(Error, function() { ZeroOrUnparsable.parse('') })
        assertThrows(Error, function() { ZeroOrUnparsable.parse('foo') })
        assertThrows(Error, function() { ZeroOrUnparsable.parse('foofoo') })
      }})
    }})
  }})

  describe('with one minimum occurence', function() { with(this) {
    before(function() { with(this) {
      parseHelper.compile('grammar global.OneOrMoreTest \
        root <- "foo"+')
    }})

    it('does not match zero occurences of the pattern', function() { with(this) {
      assertThrows(Error, function() { OneOrMoreTest.parse('') })
    }})

    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],

        OneOrMoreTest.parse('foo') )
    }})

    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],

        OneOrMoreTest.parse('foofoofoo') )
    }})

    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertThrows(Error, function() { OneOrMoreTest.parse('foofood') })
    }})

    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        parseHelper.compile('grammar global.OneOrUnparsable \
          root <- "foo"+ "foo"')
      }})

      it('does not parse any number of occurences', function() { with(this) {
        assertThrows(Error, function() { OneOrUnparsable.parse('') })
        assertThrows(Error, function() { OneOrUnparsable.parse('foo') })
        assertThrows(Error, function() { OneOrUnparsable.parse('foofoo') })
      }})
    }})
  }})
}})
