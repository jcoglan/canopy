Stake.Parser.ChoiceSpec = JS.Test.describe(Stake.Parser.Choice, function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['choice',
                    ['string', 'foo'],
                    ['string', 'bar'],
                    ['string', 'baz']])
  }})
  
  it('parses the first choice', function() { with(this) {
    assertParse( ['foo', 0, []], parser.parse('foo') )
  }})
  
  it('parses the second choice', function() { with(this) {
    assertParse( ['bar', 0, []], parser.parse('bar') )
  }})
  
  it('parses the third choice', function() { with(this) {
    assertParse( ['baz', 0, []], parser.parse('baz') )
  }})
  
  it('does not parse two choices together', function() { with(this) {
    assertNull( parser.parse('foobar') )
  }})
  
  it('does not parse a superstring of any choice', function() { with(this) {
    assertNull( parser.parse('foob') )
    assertNull( parser.parse('barb') )
    assertNull( parser.parse('bazb') )
  }})
  
  describe('when the choices are ambiguous', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['choice',
                      ['string', 'foxes love'],
                      ['sequence',
                        ['string', 'chunky'],
                        ['string', 'bacon']],
                      ['sequence',
                        ['string', 'chunkyb'],
                        ['string', 'acon']]])
    }})
    
    it('chooses the first matching path', function() { with(this) {
      assertParse(['chunkybacon', 0, [
                    ['chunky', 0, []],
                    ['bacon', 6, []]]],
        
        parser.parse('chunkybacon') )
    }})
  }})
  
  describe('backtracking', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['choice',
                      ['string', 'foob'],
                      ['string', 'foo']])
    }})
    
    it('chooses the first path if it completes the input', function() { with(this) {
      assertParse( ['foob', 0, []], parser.parse('foob') )
    }})
    
    it('chooses the second path otherwise', function() { with(this) {
      assertParse( ['foo', 0, []], parser.parse('foo') )
    }})
    
    describe('within a sequence', function() { with(this) {
      before(function() { with(this) {
        // ("word" "type" / "word") "bar"
        this.parser = Stake.Parser.fromSexp(
                      ['sequence',
                        ['choice',
                          ['sequence',
                            ['string', 'word'],
                            ['string', 'type']],
                          ['string', 'word']],
                        ['string', 'bar']])
      }})
      
      it('parses the long version', function() { with(this) {
        assertParse(['wordtypebar', 0, [
                      ['wordtype', 0, [
                        ['word', 0, []],
                        ['type', 4, []]]],
                      ['bar', 8, []]]],
          
          parser.parse('wordtypebar') )
      }})
      
      it('parses the short version', function() { with(this) {
        assertParse(['wordbar', 0, [
                      ['word', 0, []],
                      ['bar', 4, []]]],
          
          parser.parse('wordbar') )
      }})
    }})
  }})
}})

