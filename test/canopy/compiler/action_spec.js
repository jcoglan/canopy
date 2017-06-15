var parseHelper = require('../../parse_helper'),
    jstest      = require('jstest').Test

jstest.describe("Compiler.Action", function() { with(this) {
  include(parseHelper)

  describe('constructing a string node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.StringActionTest \
        rule <- "begin" %begin')

      this.actions = {
        begin: function() { return {type: 'tBEGIN'} }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( {type: 'tBEGIN'}, StringActionTest.parse('begin', {actions: actions}) )
    }})
  }})

  describe('constructing a case-insensitive string node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.CIStringActionTest \
        rule <- `begin` %begin')

      this.actions = {
        begin: function() { return {type: 'tBEGIN'} }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( {type: 'tBEGIN'}, CIStringActionTest.parse('BeGiN', {actions: actions}) )
    }})
  }})

  describe('constructing a character class node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.ClassActionTest \
        rule <- [a-z] %make_char')

      this.actions = {
        make_char: function(input) { return input.toUpperCase() }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( 'Q', ClassActionTest.parse('q', {actions: actions}) )
    }})
  }})

  describe('constructing an any-char node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.AnyActionTest \
        rule <- . %char_code')

      this.actions = {
        char_code: function(input) { return input.charCodeAt(0).toString(16) }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( '41', AnyActionTest.parse('A', {actions: actions}) )
    }})
  }})

  describe('constructing a parenthesised node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.ParenActionTest \
        rule <-  ( ( ( ( . ) ) ) ) %char_code')

      this.actions = {
        char_code: function(input, start) { return input.charCodeAt(start).toString(16) }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( '41', ParenActionTest.parse('A', {actions: actions}) )
    }})
  }})

  describe('constructing an optional node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.MaybeActionTest \
        rule <- ([0-9]+ %to_int)?')

      this.actions = {
        to_int: function(input, start, end, elements) {
          var x = parseInt(input.substring(start, end), 10)
          return x === 4 ? null : x
        }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( 3, MaybeActionTest.parse('3', {actions: actions}) )
    }})

    it('treats falsey values as successes', function() { with(this) {
      assertEqual( 0, MaybeActionTest.parse('0', {actions: actions}) )
    }})

    it('treats null as a success', function() { with(this) {
      assertEqual( null, MaybeActionTest.parse('4', {actions: actions}) )
    }})
  }})

  describe('constructing a predicated node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.PredicateActionTest \
        rule <- "value: " &([0-9]+ %to_int) [0-9]')

      this.actions = {
        to_int: function(input, start, end, elements) {
          return parseInt(input.substring(start, end), 10)
        }
      }
    }})

    it('treats falsey values as successes', function() { with(this) {
      assertEqual( 'value: 0', PredicateActionTest.parse('value: 0', {actions: actions}).text )
    }})
  }})

  describe('constructing a repeated node', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.IntActionTest \
        list <- (num "," %lift)* %to_list \
        num  <- ([0-9])+ %to_int')

      this.actions = {
        to_list: function(input, start, end, elements) {
          return elements;
        },
        lift: function(input, start, end, elements) {
          return elements[0];
        },
        to_int: function(input, start, end, elements) {
          return parseInt(input.substring(start, end), 10)
        }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( [3], IntActionTest.parse('3,', {actions: actions}) )
    }})

    it('treats falsey values as successes', function() { with(this) {
      assertEqual( [1,0,1], IntActionTest.parse('1,0,1,', {actions: actions}) )
    }})
  }})

  describe('constructing a sequence', function() { with(this) {
    before(function() { with(this) {
      compile('grammar global.MathActionTest \
        addition <- int " "* "+" " "* int %add \
        int      <- [0-9]* %an_int')

      this.actions = {
        add: function(input, start, end, elements) {
          return [elements[2].text, elements[0], elements[4]];
        },
        an_int: function(input, start, end, elements) {
          return parseInt(input.substring(start, end), 10)
        }
      }
    }})

    it('creates nodes using the named action', function() { with(this) {
      assertEqual( ['+', 4, 5], MathActionTest.parse('4 + 5', {actions: actions}) )
    }})

    it('treats falsey nodes as successes', function() { with(this) {
      assertEqual( ['+', 0, 1], MathActionTest.parse('0+1', {actions: actions}) )
    }})
  }})

  describe('making a choice', function() { with(this) { describe
    before(function() { with(this) {
      compile('grammar global.ChoiceActionTest \
        number <- "0" %num / [1-9] [0-9]* %num')

      this.actions = {
        num: function(input, start, end, elements) {
          return parseInt(input.substring(start, end), 10)
        }
      }
    }})

    it('treats falsey values as successes', function() { with(this) {
      assertEqual( 0, ChoiceActionTest.parse('0', {actions: actions}) )
    }})
  }})
}})
