Canopy.Compiler.PredicatedAtomSpec = JS.Test.describe(Canopy.Compiler.PredicatedAtom,
function() {
  include(Canopy.SpecHelper)
  
  describe('positive lookahead', function() {
    before(function() {
      Canopy.compile('grammar AndTest\
        predicate <- &"foosball" "foo" .*')
    })
    
    it('parses text that begins with the expected pattern', function() {
      assertParse(['foosball', 0, [
                    ['', 0, []],
                    ['foo', 0, []],
                    ['sball', 3, [
                      ['s', 3, []],
                      ['b', 4, []],
                      ['a', 5, []],
                      ['l', 6, []],
                      ['l', 7, []]]]]],
        
        AndTestParser.parse('foosball') )
    })
    
    it('does not parse text that does not begin with the expected pattern', function() {
      assertNull( AndTestParser.parse('foobar') )
    })
  })
  
  describe('negative lookahead', function() {
    before(function() {
      Canopy.compile('grammar NotTest\
        predicate <- !"foo" "bar"')
    })
    
    it('parses text that does not begin with the negated pattern', function() {
      assertParse(['bar', 0, [
                    ['', 0, []],
                    ['bar', 0, []]]],
        
        NotTestParser.parse('bar') )
    })
    
    it('does not parse text beginning with the negated pattern', function() {
      assertNull( NotTestParser.parse('foobar') )
    })
    
    describe('combined with repetition', function() {
      before(function() {
        Canopy.compile('grammar RepeatNotTest\
          predicate <- (!" " .)+ " "')
      })
      
      it('matches a word followed by a space', function() {
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
          
          RepeatNotTestParser.parse('fun ') )
      })
      
      it('does not match a word with no space', function() {
        assertNull( RepeatNotTestParser.parse('chunky') )
      })
      
      it('does not match multiple words', function() {
        assertNull( RepeatNotTestParser.parse('chunky bacon ') )
      })
    })
  })
})

