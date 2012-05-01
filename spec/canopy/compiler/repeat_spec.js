Canopy.Compiler.RepeatSpec = JS.Test.describe("Canopy.Compiler.Repeat",
function() { with(this) {
  include(Canopy.SpecHelper)
  
  describe('maybe', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.MaybeTest\
        maybe <- "jc"?')
    }})
    
    it('parses if its pattern is present', function() { with(this) {
      assertParse( ['jc', 0, []], MaybeTestParser.parse('jc') )
    }})
    
    it('parses if no input is given', function() { with(this) {
      assertParse( ['', 0, []], MaybeTestParser.parse('') )
    }})
    
    it('does not parse if different input is given', function() { with(this) {
      assertThrows(Error, function() { MaybeTestParser.parse('gc') })
    }})
  }})
  
  describe('with zero minimum occurences', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.ZeroOrMoreTest\
        root <- "foo"*')
    }})
    
    it('matches zero occurences of the pattern', function() { with(this) {
      assertParse( ['', 0, []], ZeroOrMoreTestParser.parse('') )
    }})
    
    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        ZeroOrMoreTestParser.parse('foo') )
    }})
    
    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        ZeroOrMoreTestParser.parse('foofoofoo') )
    }})
    
    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertThrows(Error, function() { ZeroOrMoreTestParser.parse('foofood') })
    }})
    
    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.ZeroOrUnparsable\
          root <- "foo"* "foo"')
      }})
      
      it('does not parse any number of occurences', function() { with(this) {
        assertThrows(Error, function() { ZeroOrUnparsableParser.parse('') })
        assertThrows(Error, function() { ZeroOrUnparsableParser.parse('foo') })
        assertThrows(Error, function() { ZeroOrUnparsableParser.parse('foofoo') })
      }})
    }})
  }})
  
  describe('with one minimum occurence', function() { with(this) {
    before(function() { with(this) {
      Canopy.compile('grammar JS.ENV.OneOrMoreTest\
        root <- "foo"+')
    }})
    
    it('does not match zero occurences of the pattern', function() { with(this) {
      assertThrows(Error, function() { OneOrMoreTestParser.parse('') })
    }})
    
    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        OneOrMoreTestParser.parse('foo') )
    }})
    
    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        OneOrMoreTestParser.parse('foofoofoo') )
    }})
    
    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertThrows(Error, function() { OneOrMoreTestParser.parse('foofood') })
    }})
    
    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.OneOrUnparsable\
          root <- "foo"+ "foo"')
      }})
      
      it('does not parse any number of occurences', function() { with(this) {
        assertThrows(Error, function() { OneOrUnparsableParser.parse('') })
        assertThrows(Error, function() { OneOrUnparsableParser.parse('foo') })
        assertThrows(Error, function() { OneOrUnparsableParser.parse('foofoo') })
      }})
    }})
  }})
}})

