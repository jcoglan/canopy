Stake.Compiler.SequenceSpec = JS.Test.describe(Stake.Compiler.Sequence, function() { with(this) {
  include(Stake.SpecHelper)
  
  before(function() { with(this) {
    Stake.compile('grammar SequenceTest\
      sequence <- "foo" "bar"')
  }})
  
  it('parses sequences matching its content', function() { with(this) {
    assertParse(['foobar', 0, [
                  ['foo', 0, []],
                  ['bar', 3, []]]],
      
      SequenceTestParser.parse('foobar') )
  }})
  
  it('does not parse nonmatching sequences', function() { with(this) {
    assertNull( SequenceTestParser.parse('foobaz') )
    assertNull( SequenceTestParser.parse('doobar') )
  }})
  
  it('does not parse if the first term is missing', function() { with(this) {
    assertNull( SequenceTestParser.parse('bar') )
  }})
  
  it('does not parse superstrings of itself', function() { with(this) {
    assertNull( SequenceTestParser.parse('foobart') )
  }})
}})

