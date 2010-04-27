Stake.Parser.RepeatSpec = JS.Test.describe(Stake.Parser.Repeat, function() { with(this) {
  include(Stake.SpecHelper)
  
  describe('with zero minimum occurences', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['repeat', 0, ['string', 'foo']])
    }})
    
    it('matches zero occurences of the pattern', function() { with(this) {
      assertParse( ['', 0, []], parser.parse('') )
    }})
    
    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        parser.parse('foo') )
    }})
    
    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        parser.parse('foofoofoo') )
    }})
    
    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertNull( parser.parse('foofood') )
    }})
    
    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        this.parser = Stake.Parser.fromSexp(
                      ['sequence',
                        ['repeat', 0, ['string', 'foo']],
                        ['string', 'foo']])
      }})
      
      it('does not parse any number of occurences', function() { with(this) {
        assertNull( parser.parse('') )
        assertNull( parser.parse('foo') )
        assertNull( parser.parse('foofoo') )
      }})
    }})
  }})
  
  describe('with one minimum occurence', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['repeat', 1, ['string', 'foo']])
    }})
    
    it('does not match zero occurences of the pattern', function() { with(this) {
      assertNull( parser.parse('') )
    }})
    
    it('matches one occurence of the pattern', function() { with(this) {
      assertParse(['foo', 0, [
                    ['foo', 0, []]]],
        
        parser.parse('foo') )
    }})
    
    it('matches more than one occurence of the pattern', function() { with(this) {
      assertParse(['foofoofoo', 0, [
                    ['foo', 0, []],
                    ['foo', 3, []],
                    ['foo', 6, []]]],
        
        parser.parse('foofoofoo') )
    }})
    
    it('does not match superstrings of the repeated pattern', function() { with(this) {
      assertNull( parser.parse('foofood') )
    }})
    
    describe('followed by more of the repeated pattern', function() { with(this) {
      before(function() { with(this) {
        this.parser = Stake.Parser.fromSexp(
                      ['sequence',
                        ['repeat', 1, ['string', 'foo']],
                        ['string', 'foo']])
      }})
      
      it('does not parse any number of occurences', function() { with(this) {
        assertNull( parser.parse('') )
        assertNull( parser.parse('foo') )
        assertNull( parser.parse('foofoo') )
      }})
    }})
  }})
}})

