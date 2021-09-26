const jstest      = require("jstest").Test
const ParseHelper = require("./parse_helper")
const Extensions  = require("../grammars/extensions")

jstest.describe("extensions", function() { with(this) {
  include(ParseHelper)

  it("adds methods to a string", function() { with(this) {
    let input  = "ext-str: hello"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([0, ["h", "e", "l", "l", "o"]], result.extFunc())
  }})

  it("adds methods to a char class", function() { with(this) {
    let input  = "ext-class: k"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([0, ["k"]], result.extFunc())
  }})

  it("adds methods to any char", function() { with(this) {
    let input  = "ext-any: ?"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([0, ["?"]], result.extFunc())
  }})

  it("adds methods to a maybe rule", function() { with(this) {
    let input  = "ext-maybe: hello"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([0, ["h", "e", "l", "l", "o"]], result.extFunc())
  }})

  it("adds methods to a repetition", function() { with(this) {
    let input  = "ext-rep: abc"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([3, ["a", "b", "c"]], result.extFunc())
  }})

  it("adds methods to a sequence", function() { with(this) {
    let input  = "ext-seq: xyz"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([3, ["x", "y", "z"]], result.extFunc())
  }})

  it("adds methods to a parenthesised expression", function() { with(this) {
    let input  = "ext-paren: !"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([0, ["!"]], result.extFunc())
  }})

  it("adds methods to the options of a choice", function() { with(this) {
    let input  = "ext-choice: 0"
    let result = Extensions.parse(input, { types: Types }).elements[1]
    assertEqual([0, ["0"]], result.extFunc())

    input  = "ext-choice: 42"
    result = Extensions.parse(input, { types: Types }).elements[1]
    assertEqual([2, ["4", "2"]], result.extFunc())
  }})

  it("adds methods to the result of a reference", function() { with(this) {
    let input  = "ext-ref: hello"
    let result = Extensions.parse(input, { types: Types }).elements[1]

    assertEqual([0, ["h", "e", "l", "l", "o"]], result.extFunc())
  }})
}})

const Types = {
  Ext: {
    extFunc() {
      return [this.elements.length, this.text.split('')]
    }
  }
}
