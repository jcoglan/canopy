Stake.CharClassParserSpec = JS.Test.describe(Stake.CharClassParser,
function() { with(this) {
  include(Stake.SpecHelper)
  
  describe('positive', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['char-class', '[a-z]'])
    }})
    
    it('parses characters within the class', function() { with(this) {
      assertParse( ['a', 0, []], parser.parse('a') )
    }})
    
    it('does not parse characters outside the class', function() { with(this) {
      assertNull( parser.parse('7') )
    }})
    
    it('does not parse characters within the class appearing too late', function() { with(this) {
      assertNull( parser.parse('7a') )
    }})
  }})
  
  describe('negative', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['char-class', '[^a-z]'])
    }})
    
    it('parses characters within the class', function() { with(this) {
      assertParse( ['7', 0, []], parser.parse('7') )
    }})
    
    it('does not parse characters outside the class', function() { with(this) {
      assertNull( parser.parse('a') )
    }})
    
    it('does not parse characters within the class appearing too late', function() { with(this) {
      assertNull( parser.parse('a7') )
    }})
  }})
  
  describe('with sequencing and repetition', function() { with(this) {
    before(function() { with(this) {
      this.parser = Stake.Parser.fromSexp(
                    ['sequence',
                      ['char-class', '[1-9]'],
                      ['repeat', 0, ['char-class', '[0-9]']]])
    }})
    
    it('parses integers', function() { with(this) {
      assertParse(['3718', 0, [
                    ['3', 0, []],
                    ['718', 1, [
                      ['7', 1, []],
                      ['1', 2, []],
                      ['8', 3, []]]]]],
        
        parser.parse('3718') )
    }})
    
    it('does not parse floats', function() { with(this) {
      assertNull( parser.parse('7.4') )
    }})
    
    it('does not parse octal', function() { with(this) {
      assertNull( parser.parse('0644') )
    }})
  }})
}})

