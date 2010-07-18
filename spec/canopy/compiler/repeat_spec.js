Canopy.Compiler.RepeatSpec = JS.Test.describe(Canopy.Compiler.Repeat, function() {
  include(Canopy.SpecHelper)
  
  describe('maybe', function() {
    before(function() {
      Canopy.compile('grammar MaybeTest\
        maybe <- "jc"?')
    })
    
    it('parses if its pattern is present', function() {
      assertParse( ['jc', 0, []], MaybeTestParser.parse('jc') )
    })
    
    it('parses if no input is given', function() {
      assertParse( ['', 0, []], MaybeTestParser.parse('') )
    })
    
    it('does not parse if different input is given', function() {
      assertNull( MaybeTestParser.parse('gc') )
    })
  })
  
  describe('with zero minimum occurences', function() {
    before(function() {
      Canopy.compile('grammar ZeroOrMoreTest\
        root <- "foo"*')
    })
    
    it('matches zero occurences of the pattern', function() {
      assertParse( ['', 0, []], ZeroOrMoreTestParser.parse('') )
    })
    
    it('matches one occurence of the pattern', function() {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        ZeroOrMoreTestParser.parse('foo') )
    })
    
    it('matches more than one occurence of the pattern', function() {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        ZeroOrMoreTestParser.parse('foofoofoo') )
    })
    
    it('does not match superstrings of the repeated pattern', function() {
      assertNull( ZeroOrMoreTestParser.parse('foofood') )
    })
    
    describe('followed by more of the repeated pattern', function() {
      before(function() {
        Canopy.compile('grammar ZeroOrUnparsable\
          root <- "foo"* "foo"')
      })
      
      it('does not parse any number of occurences', function() {
        assertNull( ZeroOrUnparsableParser.parse('') )
        assertNull( ZeroOrUnparsableParser.parse('foo') )
        assertNull( ZeroOrUnparsableParser.parse('foofoo') )
      })
    })
  })
  
  describe('with one minimum occurence', function() {
    before(function() {
      Canopy.compile('grammar OneOrMoreTest\
        root <- "foo"+')
    })
    
    it('does not match zero occurences of the pattern', function() {
      assertNull( OneOrMoreTestParser.parse('') )
    })
    
    it('matches one occurence of the pattern', function() {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        OneOrMoreTestParser.parse('foo') )
    })
    
    it('matches more than one occurence of the pattern', function() {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        OneOrMoreTestParser.parse('foofoofoo') )
    })
    
    it('does not match superstrings of the repeated pattern', function() {
      assertNull( OneOrMoreTestParser.parse('foofood') )
    })
    
    describe('followed by more of the repeated pattern', function() {
      before(function() {
        Canopy.compile('grammar OneOrUnparsable\
          root <- "foo"+ "foo"')
      })
      
      it('does not parse any number of occurences', function() {
        assertNull( OneOrUnparsableParser.parse('') )
        assertNull( OneOrUnparsableParser.parse('foo') )
        assertNull( OneOrUnparsableParser.parse('foofoo') )
      })
    })
  })
})

