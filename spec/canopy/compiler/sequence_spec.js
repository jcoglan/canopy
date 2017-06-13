var parseHelper = require('../../parse_helper'),
    jstest      = require('jstest').Test

jstest.describe("Compiler.Sequence", function() { with(this) {
  include(parseHelper)

  before(function() { with(this) {
    parseHelper.compile('grammar global.SequenceTest \
      sequence <- "foo" "bar"')
  }})

  it('parses sequences matching its content', function() { with(this) {
    assertParse(['foobar', 0, [
                  ['foo', 0, []],
                  ['bar', 3, []]]],

      SequenceTest.parse('foobar') )
  }})

  it('does not parse nonmatching sequences', function() { with(this) {
    assertThrows(Error, function() { SequenceTest.parse('foobaz') })
    assertThrows(Error, function() { SequenceTest.parse('doobar') })
  }})

  it('does not parse if the first term is missing', function() { with(this) {
    assertThrows(Error, function() { SequenceTest.parse('bar') })
  }})

  it('does not parse superstrings of itself', function() { with(this) {
    assertThrows(Error, function() { SequenceTest.parse('foobart') })
  }})

  describe('muting', function() { with(this) {
    before(function() { with(this) {
      parseHelper.compile('grammar global.MuteTest \
        sequence <- first:"foo" @"bar" last:"qux"')
    }})

    it('excludes marked expresions from the tree', function() { with(this) {
      assertParse(['foobarqux', 0, [
                    ['foo', 0, []],
                    ['qux', 6, []]]],

        MuteTest.parse('foobarqux') )
    }})

    it('excludes marked expresions from the labelled nodes', function() { with(this) {
      assertParse(['foobarqux', 0, [
                    ['foo', 0, []],
                    ['qux', 6, []]], {
                    first: ['foo', 0, []],
                    last: ['qux', 6, []]
                  }],

        MuteTest.parse('foobarqux') )
    }})
  }})

  describe('labelling', function() { with(this) {
    describe('a terminal node', function() { with(this) {
      before(function() { with(this) {
        parseHelper.compile('grammar global.LabelTestA \
          root <- "first" middle:"second" "third"')
      }})

      it('adds the label as an extra property to the parse tree', function() { with(this) {
        assertParse(['firstsecondthird', 0, [
                      ['first', 0, []],
                      ['second', 5, []],
                      ['third', 11, []]], {
                      middle: ['second', 5, []]
                    }],

          LabelTestA.parse('firstsecondthird') )
      }})
    }})

    describe('a reference', function() { with(this) {
      before(function() { with(this) {
        parseHelper.compile('grammar global.LabelTestR \
          root   <- "first" middle "third" \
          middle <- "second"')
      }})

      it('uses the name of the reference as a label', function() { with(this) {
        assertParse(['firstsecondthird', 0, [
                      ['first', 0, []],
                      ['second', 5, []],
                      ['third', 11, []]], {
                      middle: ['second', 5, []]
                    }],

          LabelTestR.parse('firstsecondthird') )
      }})
    }})

    describe('a labelled reference', function() { with(this) {
      before(function() { with(this) {
        parseHelper.compile('grammar global.LabelTestR \
          root   <- "first" alias:middle "third" \
          middle <- "second"')
      }})

      it('uses the name of the label and reference', function() { with(this) {
        assertParse(['firstsecondthird', 0, [
                      ['first', 0, []],
                      ['second', 5, []],
                      ['third', 11, []]], {
                      alias: ['second', 5, []],
                      middle: ['second', 5, []]
                    }],

          LabelTestR.parse('firstsecondthird') )
      }})
    }})

    describe('a repetition node', function() { with(this) {
      before(function() { with(this) {
        parseHelper.compile('grammar global.LabelTestB \
          root <- "first" middle:"a"+ "third"')
      }})

      it('labels the node containing the repetition', function() { with(this) {
        assertParse(['firstaathird', 0, [
                      ['first', 0, []],
                      ['aa', 5, [
                        ['a', 5, []],
                        ['a', 6, []]]],
                      ['third', 7, []]], {
                      middle: ['aa', 5, [
                        ['a', 5, []],
                        ['a', 6, []]]]
                    }],

          LabelTestB.parse('firstaathird') )
      }})

      it('does not parse if the expression it labels does not parse', function() { with(this) {
        assertThrows(Error, function() { LabelTestB.parse('firstthird') })
      }})
    }})

    describe('nesting', function() { with(this) {
      before(function() { with(this) {
        parseHelper.compile('grammar global.LabelTestC \
          root <- firstLetter:[a-z] restLetters:(", " letter:[a-z])*')

        this.rest = [', b, c', 1, [
                      [', b', 1, [
                        [', ', 1, []],
                        ['b', 3, []]], {
                        letter: ['b', 3, []]
                      }],
                      [', c', 4, [
                        [', ', 4, []],
                        ['c', 6, []]], {
                        letter: ['c', 6, []]
                      }]]]
      }})

      it('applies labels to nested nodes', function() { with(this) {
        assertParse(['a, b, c', 0, [
                      ['a', 0, []],
                      rest], {
                      firstLetter: ['a', 0, []],
                      restLetters: rest
                    }],

          LabelTestC.parse('a, b, c') )
      }})
    }})
  }})
}})
