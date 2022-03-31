const jstest      = require("jstest").Test
const ParseHelper = require("./parse_helper")
const NodeActions = require("../grammars/node_actions")

jstest.describe("actions", function() { with(this) {
  include(ParseHelper)

  it("makes nodes from a string", function() { with(this) {
    let input  = "act-str: hello"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["str", input, 9, 14, []], result)
  }})

  it("makes nodes from a char class", function() { with(this) {
    let input  = "act-class: k"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["char", input, 11, 12, []], result)
  }})

  it("makes nodes from any char", function() { with(this) {
    let input  = "act-any: ?"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["any", input, 9, 10, []], result)
  }})

  it("makes nodes from a maybe rule", function() { with(this) {
    let input  = "act-maybe: hello"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["maybe", input, 11, 16, []], result)
  }})

  it(" does not invoke an action for a maybe rule with no match", function() { with(this) {
    let input  = "act-maybe: "
    assertParse(["", 11, []], NodeActions.parse(input, { actions: new TestActions() }))
  }})

  it("makes nodes from a repetition", function() { with(this) {
    let input  = "act-rep: abc"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["rep", input, 9, 12], result.slice(0, 4))

    assertParseElements([
      ["a", 9, []],
      ["b", 10, []],
      ["c", 11, []]
    ], result)
  }})

  it("makes nodes from a repetition in parentheses", function() { with(this) {
    let input  = "act-rep-paren: abab"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["rep-paren", input, 15, 19], result.slice(0, 4))

    assertParseElements([
      ["ab", 15, [
        ["a", 15, []],
        ["b", 16, []]
      ]],
      ["ab", 17, [
        ["a", 17, []],
        ["b", 18, []]
      ]]
    ], result)
  }})

  it("makes nodes from a sequence", function() { with(this) {
    let input  = "act-seq: xyz"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["seq", input, 9, 12], result.slice(0, 4))

    assertParseElements([
      ["x", 9, []],
      ["y", 10, []],
      ["z", 11, []]
    ], result)
  }})

  it("makes nodes from a sequence with muted elements", function() { with(this) {
    let input  = "act-seq-mute: xyz"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["seq", input, 14, 17], result.slice(0, 4))

    assertParseElements([
      ["x", 14, []],
      ["z", 16, []]
    ], result)
  }})

  it("makes nodes from a parenthesised expression", function() { with(this) {
    let input  = "act-paren: !"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["paren", input, 11, 12, []], result)
  }})

  it("binds to the options of a choice", function() { with(this) {
    let input  = "act-choice: 0"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]
    assertEqual(["zero", input, 12, 13, []], result)

    input  = "act-choice: 42"
    result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(["int", input, 12, 14], result.slice(0, 4))

    assertParseElements([
      ["4", 12, []],
      ["2", 13, [
        ["2", 13, []]
      ]]
    ], result)
  }})

  it("treats null as a valid result", function() { with(this) {
    let result = NodeActions.parse("act-falsey: null", { actions: new TestActions() }).elements[1]
    assertEqual(null, result)
  }})

  it("treats false as a valid result", function() { with(this) {
    let result = NodeActions.parse("act-falsey: false", { actions: new TestActions() }).elements[1]
    assertEqual(false, result)
  }})

  it("treats zero as a valid result", function() { with(this) {
    let result = NodeActions.parse("act-falsey: 0", { actions: new TestActions() }).elements[1]
    assertEqual(0, result)
  }})

  it("treats empty strings as a valid result", function() { with(this) {
    let result = NodeActions.parse("act-falsey: ''", { actions: new TestActions() }).elements[1]
    assertEqual("", result)
  }})

  it("treats empty lists as a valid result", function() { with(this) {
    let result = NodeActions.parse("act-falsey: []", { actions: new TestActions() }).elements[1]
    assertEqual([], result)
  }})

  it("treats falsey values as acceptable lookahead results", function() { with(this) {
    let input  = "act-falsey-pred: 0"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1].elements[1]

    assertEqual(["zero", input, 17, 18, []], result)
  }})

  it("treats falsey values as acceptable repetition results", function() { with(this) {
    let result = NodeActions.parse("act-falsey-rep: null0false''[]", { actions: new TestActions() })
    assertEqual([null, 0, false, "", []], result.elements[1].elements)
  }})

  it("treats falsey values as acceptable maybe results", function() { with(this) {
    let input  = "act-falsey-opt: null"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(null, result)
  }})

  it("treats falsey values as acceptable sequence results", function() { with(this) {
    let input  = "act-falsey-seq: (null)"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(3, result.elements.length)
    assertEqual(null, result.elements[1])
  }})

  it("treats falsey values as acceptable choice results", function() { with(this) {
    let input  = "act-falsey-choice: null"
    let result = NodeActions.parse(input, { actions: new TestActions() }).elements[1]

    assertEqual(null, result)
  }})
}})

class TestActions {
  make_str(...args) {
    return ["str", ...args]
  }

  make_char(...args) {
    return ["char", ...args]
  }

  make_any(...args) {
    return ["any", ...args]
  }

  make_maybe(...args) {
    return ["maybe", ...args]
  }

  make_rep(...args) {
    return ["rep", ...args]
  }

  make_seq(...args) {
    return ["seq", ...args]
  }

  make_paren(...args) {
    return ["paren", ...args]
  }

  make_rep_paren(...args) {
    return ["rep-paren", ...args]
  }

  make_zero(...args) {
    return ["zero", ...args]
  }

  make_int(...args) {
    return ["int", ...args]
  }

  make_null(...args) {
    return null
  }

  make_false(...args) {
    return false
  }

  make_0(...args) {
    return 0
  }

  make_empty_str(...args) {
    return ""
  }

  make_empty_list(...args) {
    return []
  }
}
