StakeSpec = JS.Test.describe(Stake, function() { with(this) {
  describe('StringParser', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(['string', 'foo']);
    }})
    
    it('parses the string it contains', function() { with(this) {
      assertEqual( 'foo', parser.parse('foo').textValue )
    }})
    
    it('does not parse other strings', function() { with(this) {
      assertNull( parser.parse('bar') )
    }})
    
    it('does not parse superstrings of itself', function() { with(this) {
      assertNull( parser.parse('food') )
    }})
  }})
}})

