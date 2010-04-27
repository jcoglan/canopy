Stake.Parser.TypeSpec = JS.Test.describe(Stake.Parser.Type, function() { with(this) {
  include(Stake.SpecHelper)
  
  describe('when the node type is a class', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Class(Stake.SyntaxNode)
      
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
      NodeType = new JS.Module({ custom: function(){} })
      
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
  
  describe('when the underlying parser is a choice', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Module({ custom: function(){} })
      
      this.parser = Stake.Parser.fromSexp(
                    ['type', 'NodeType',
                      ['choice',
                        ['string', 'content'],
                        ['string', 'booya']]])
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertKindOf( NodeType, parser.parse('booya') )
    }})
  }})
  
  describe('when the underlying parser is a maybe', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Module({ custom: function(){} })
      
      this.parser = Stake.Parser.fromSexp(
                    ['type', 'NodeType',
                      ['maybe', ['string', 'content']]])
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertKindOf( NodeType, parser.parse('content') )
    }})
  }})
  
  describe('when the node type is namespaced', function() { with(this) {
    before(function() { with(this) {
      NS = { NodeType : new JS.Class(Stake.SyntaxNode) }
      
      this.parser = Stake.Parser.fromSexp(
                    ['type', 'NS.NodeType',
                      ['string', 'content']])
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      assertKindOf( NS.NodeType, parser.parse('content') )
    }})
  }})
}})

