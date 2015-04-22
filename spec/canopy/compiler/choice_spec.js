JS.ENV.Canopy.Compiler.ChoiceSpec = JS.Test.describe("Canopy.Compiler.Choice",
function() { with(this) {
  include(Canopy.SpecHelper)

  before(function() { with(this) {
    Canopy.compile('grammar JS.ENV.ChoiceTest\
      choice <- "foo" / "bar" / "baz"')
  }})

  it('parses the first choice', function() { with(this) {
    assertParse( ['foo', 0, []], ChoiceTest.parse('foo') )
  }})

  it('parses the second choice', function() { with(this) {
    assertParse( ['bar', 0, []], ChoiceTest.parse('bar') )
  }})

  it('parses the third choice', function() { with(this) {
    assertParse( ['baz', 0, []], ChoiceTest.parse('baz') )
  }})

  it('does not parse two choices together', function() { with(this) {
    assertThrows(Error, function() { ChoiceTest.parse('foobar') })
  }})
  
  it('records all possible options in the error', function() { with(this) {
    assertThrows(Error, function() { ChoiceTest.parse('') })
    assertEqual( {offset: 0, expected: ['"foo"', '"bar"', '"baz"']}, ChoiceTest.Parser.lastError )
  }})

  it('does not parse a superstring of any choice', function() { with(this) {
    assertThrows(Error, function() { ChoiceTest.parse('foob') })
    assertThrows(Error, function() { ChoiceTest.parse('barb') })
    assertThrows(Error, function() { ChoiceTest.parse('bazb') })
  }})

  describe('when the choices are ambiguous', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.AmbiguousChoiceTest\
        choice <- "foxes love" / "chunky" "bacon" / "chunkyb" "acon"')
    }})

    it('chooses the first matching path', function() { with(this) {
      assertParse(['chunkybacon', 0, [
                    ['chunky', 0, []],
                    ['bacon', 6, []]]],

        AmbiguousChoiceTest.parse('chunkybacon') )
    }})
  }})

  describe('backtracking', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.BacktrackingChoiceTest\
        choice <- "foob" / "foo"')
    }})

    it('chooses the first path if it completes the input', function() { with(this) {
      assertParse( ['foob', 0, []], BacktrackingChoiceTest.parse('foob') )
    }})

    it('chooses the second path otherwise', function() { with(this) {
      assertParse( ['foo', 0, []], BacktrackingChoiceTest.parse('foo') )
    }})

    describe('within a sequence', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.BacktrackingSequenceChoice\
          choice <- ("word" "type" / "word") "bar"')
      }})

      it('parses the long version', function() { with(this) {
        assertParse(['wordtypebar', 0, [
                      ['wordtype', 0, [
                        ['word', 0, []],
                        ['type', 4, []]]],
                      ['bar', 8, []]]],

          BacktrackingSequenceChoice.parse('wordtypebar') )
      }})

      it('parses the short version', function() { with(this) {
        assertParse(['wordbar', 0, [
                      ['word', 0, []],
                      ['bar', 4, []]]],

          BacktrackingSequenceChoice.parse('wordbar') )
      }})
    }})
  }})
}})
