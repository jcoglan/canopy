StakeSpec = JS.Test.describe(Stake, function() { with(this) {
  describe('StringParser', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(['string', 'foo'])
    }})
    
    it('parses the string it contains', function() { with(this) {
      assertEqual( {textValue: 'foo', offset: 0, elements: []}, parser.parse('foo') )
    }})
    
    it('does not parse other strings', function() { with(this) {
      assertNull( parser.parse('bar') )
    }})
    
    it('does not parse superstrings of itself', function() { with(this) {
      assertNull( parser.parse('food') )
    }})
    
    it('does not parse the empty string', function() { with(this) {
      assertNull( parser.parse('') )
    }})
  }})
  
  describe('SequenceParser', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['string', 'foo'],
                      ['string', 'bar']])
    }})
    
    it('parses sequences matching its content', function() { with(this) {
      assertEqual( {
          textValue: 'foobar',
          offset: 0,
          elements: [
            {textValue: 'foo', offset: 0, elements: []},
            {textValue: 'bar', offset: 3, elements: []}
          ]
        },
        parser.parse('foobar') )
    }})
    
    it('does not parse nonmatching sequences', function() { with(this) {
      assertNull( parser.parse('foobaz') )
      assertNull( parser.parse('doobar') )
    }})
    
    it('does not parse if the first term is missing', function() { with(this) {
      assertNull( parser.parse('bar') )
    }})
    
    it('does not parse superstrings of itself', function() { with(this) {
      assertNull( parser.parse('foobart') )
    }})
  }})
  
  describe('MaybeParser', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['maybe', ['string', 'jc']])
    }})
    
    it('parses if its pattern is present', function() { with(this) {
      assertEqual( {textValue: 'jc', offset: 0, elements: []}, parser.parse('jc') )
    }})
    
    it('parses if no input is given', function() { with(this) {
      assertEqual( {textValue: '', offset: 0, elements: []}, parser.parse('') )
    }})
    
    it('does not parse if different input is given', function() { with(this) {
      assertNull( parser.parse('gc') )
    }})
  }})
}})

