JS.ENV.Canopy.Compiler.PredicateSpec = JS.Test.describe("Canopy.Compiler.Predicate",
function() { with(this) {
  include(Canopy.SpecHelper)

  describe('positive lookahead', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.AndTest\
        predicate <- &"foosball" "foo" .*')
    }})

    it('parses text that begins with the expected pattern', function() { with(this) {
      assertParse(['foosball', 0, [
                    ['', 0, []],
                    ['foo', 0, []],
                    ['sball', 3, [
                      ['s', 3, []],
                      ['b', 4, []],
                      ['a', 5, []],
                      ['l', 6, []],
                      ['l', 7, []]]]]],

        AndTest.parse('foosball') )
    }})

    it('does not parse text that does not begin with the expected pattern', function() { with(this) {
      assertThrows(Error, function() { AndTest.parse('foobar') })
    }})
  }})

  describe('negative lookahead', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.NotTest\
        predicate <- !"foo" "bar"')
    }})

    it('parses text that does not begin with the negated pattern', function() { with(this) {
      assertParse(['bar', 0, [
                    ['', 0, []],
                    ['bar', 0, []]]],

        NotTest.parse('bar') )
    }})

    it('does not parse text beginning with the negated pattern', function() { with(this) {
      assertThrows(Error, function() { NotTest.parse('foobar') })
    }})

    describe('combined with repetition', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.RepeatNotTest\
          predicate <- (!" " .)+ " "')
      }})

      it('matches a word followed by a space', function() { with(this) {
        assertParse(['fun ', 0, [
                      ['fun', 0, [
                        ['f', 0, [
                          ['', 0, []],
                          ['f', 0, []]]],
                        ['u', 1, [
                          ['', 1, []],
                          ['u', 1, []]]],
                        ['n', 2, [
                          ['', 2, []],
                          ['n', 2, []]]]]],
                      [' ', 3, []]]],

          RepeatNotTest.parse('fun ') )
      }})

      it('does not match a word with no space', function() { with(this) {
        assertThrows(Error, function() { RepeatNotTest.parse('chunky') })
      }})

      it('does not match multiple words', function() { with(this) {
        assertThrows(Error, function() { RepeatNotTest.parse('chunky bacon ') })
      }})
    }})
  }})
}})

