Stake.TypeParserSpec = JS.Test.describe(Stake.TypeParser, function() { with(this) {
  include(Stake.SpecHelper)
  
  describe('when the node type is a class', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Class(Stake.SyntaxNode);
      
      this.parser = Stake.Parser.fromSexp(
                    ['type', 'NodeType',
                      ['string', 'content']])
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      assertKindOf( NodeType, parser.parse('content') )
    }})
    
    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], parser.parse('content') )
    }})
  }})
  
  describe('when the node type is a mixin', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Module({ custom: function(){} });
      
      this.parser = Stake.Parser.fromSexp(
                    ['type', 'NodeType',
                      ['string', 'content']])
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      var result = parser.parse('content')
      assertKindOf( NodeType, result )
      assertRespondTo( result, 'custom' )
    }})
    
    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], parser.parse('content') )
    }})
  }})
}})

