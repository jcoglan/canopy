Stake.Compiler.ChoicePartSpec = JS.Test.describe(Stake.Compiler.ChoicePart,
function() { with(this) {
  include(Stake.SpecHelper)
  
  describe('when the node type is a class', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Class(Stake.SyntaxNode)
      
      Stake.compile('grammar ClassTypeTest\
        rule <- "content" <NodeType>')
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      assertKindOf( NodeType, ClassTypeTestParser.parse('content') )
    }})
    
    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], ClassTypeTestParser.parse('content') )
    }})
  }})
  
  describe('when the node type is a mixin', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Module({ custom: function(){} })
      
      Stake.compile('grammar ModuleTypeTest\
        rule <- "content" <NodeType>')
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      var result = ModuleTypeTestParser.parse('content')
      assertKindOf( NodeType, result )
      assertRespondTo( result, 'custom' )
    }})
    
    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], ModuleTypeTestParser.parse('content') )
    }})
  }})
  
  describe('when the underlying parser is a choice', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Module({ custom: function(){} })
      
      Stake.compile('grammar TypedChoiceTest\
        rule <- ("content" / "booya") <NodeType>')
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertKindOf( NodeType, TypedChoiceTestParser.parse('booya') )
    }})
  }})
  
  describe('when the underlying parser is a maybe', function() { with(this) {
    before(function() { with(this) {
      NodeType = new JS.Module({ custom: function(){} })
      
      Stake.compile('grammar TypedMaybeTest\
        rule <- "content"? <NodeType>')
    }})
    
    it('extends the chosen node with the mixin', function() { with(this) {
      assertKindOf( NodeType, TypedMaybeTestParser.parse('content') )
    }})
  }})
  
  describe('when the node type is namespaced', function() { with(this) {
    before(function() { with(this) {
      NS = { NodeType : new JS.Class(Stake.SyntaxNode) }
      
      Stake.compile('grammar NamespacedTypeTest\
        rule <- "content" <NS.NodeType>')
    }})
    
    it('creates nodes using the named type', function() { with(this) {
      assertKindOf( NS.NodeType, NamespacedTypeTestParser.parse('content') )
    }})
  }})
}})

