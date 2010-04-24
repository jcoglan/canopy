Stake.NotParserSpec = JS.Test.describe(Stake.NotParser, function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    this.parser = Stake.Parser.fromSexp(
                  ['sequence',
                    ['not', ['string', 'foo']],
                    ['string', 'bar']])
  }})
  
  it('parses text that does not begin with the negated pattern', function() { with(this) {
    assertParse(['bar', 0, [
                  ['', 0, []],
                  ['bar', 0, []]]],
      
      parser.parse('bar') )
  }})
  
  it('does not parse text beginning with the negated pattern', function() { with(this) {
    assertNull( parser.parse('foobar') )
  }})
  
  describe('combined with repetition', function() { with(this) {
    before(function() { with(this) {
      // (!" " .)+ " "
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['repeat', 1,
                        ['sequence',
                          ['not', ['string', ' ']],
                          ['any-char']]],
                      ['string', ' ']])
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
        
        parser.parse('fun ') )
    }})
    
    it('does not match a word with no space', function() { with(this) {
      assertNull( parser.parse('chunky') )
    }})
    
    it('does not match multiple words', function() { with(this) {
      assertNull( parser.parse('chunky bacon ') )
    }})
  }})
}})

