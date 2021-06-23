var parseHelper = require('../../parse_helper'),
    jstest      = require('jstest').Test

jstest.describe("Compiler.Extension", function() { with(this) {
  include(parseHelper)

  describe('when the node type is a mixin', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.ModuleTypeTest \
        rule <- "content" <NodeType>')

      this.types = {
        NodeType: { custom: function() { return 'pass!' } }
      }
    }})

    it('creates nodes using the named type', function() { with(this) {
      var result = ModuleTypeTest.parse('content', {types: types})
      assertEqual( 'pass!', result.custom() )
      assertRespondTo( result, 'custom' )
    }})

    it('contains the parse results in the returned node', function() { with(this) {
      assertParse( ['content', 0, []], ModuleTypeTest.parse('content', {types: types}) )
    }})
  }})

  describe('when the underlying parser is a choice', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.TypedChoiceTest \
        rule <- ("content" / "booya") <NodeType>')

      this.types = {
        NodeType: { custom: function() { return 'pass!' } }
      }
    }})

    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedChoiceTest.parse('content', {types: types}).custom() )
    }})
  }})

  describe('where the underlying parser is a reference', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.TypedRefTest \
        first <- second <First> \
        second <- "bar" <Second>')

      this.types = {
        First:  { first:  function() { return '1'} },
        Second: { second: function() { return '2'} }
      }
    }})

    it('extends the chosen node with the root type', function() { with(this) {
      assertEqual( '2', TypedRefTest.parse('bar', {types: types}).second() )
    }})

    it('extends the chosen node with the reference type', function() { with(this) {
      assertEqual( '1', TypedRefTest.parse('bar', {types: types}).first() )
    }})
  }})

  describe('when the underlying parser is a repetition', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.TypedRepeatTest \
        rule <- "content"+ <NodeType>')

      this.types = {
        NodeType: { custom: function() { return 'pass!' } }
      }
    }})

    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedRepeatTest.parse('contentcontent', {types: types}).custom() )
    }})
  }})

  describe('when the underlying parser is a maybe', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.TypedMaybeTest \
        rule <- "content"? <NodeType>')

      this.types = {
        NodeType: { custom: function() { return 'pass!' } }
      }
    }})

    it('extends the chosen node with the mixin', function() { with(this) {
      assertEqual( 'pass!', TypedMaybeTest.parse('content', {types: types}).custom() )
    }})
  }})

  describe('when the node type is namespaced', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.NamespacedTypeTest \
        rule <- "content" <NS.NodeType>')

      this.types = {
        NS: { NodeType: { custom: function() { return 'pass!' } } }
      }
    }})

    it('creates nodes using the named type', function() { with(this) {
      assertEqual( 'pass!', NamespacedTypeTest.parse('content', {types: types}).custom() )
    }})
  }})
}})
