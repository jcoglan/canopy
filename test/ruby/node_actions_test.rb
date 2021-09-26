require "minitest/autorun"
require_relative "./parse_helper"
require_relative "../grammars/node_actions"

describe "actions" do
  include ParseHelper

  it "makes nodes from a string" do
    input  = "act-str: hello"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:str, input, 9, 14, []], result
  end

  it "makes nodes from a char class" do
    input  = "act-class: k"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:char, input, 11, 12, []], result
  end

  it "makes nodes from any char" do
    input  = "act-any: ?"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:any, input, 9, 10, []], result
  end

  it "makes nodes from a maybe rule" do
    input  = "act-maybe: hello"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:maybe, input, 11, 16, []], result
  end

  it " does not invoke an action for a maybe rule with no match" do
    input  = "act-maybe: "
    assert_parse ["", 11, []], NodeActions.parse(input, :actions => TestActions.new)
  end

  it "makes nodes from a repetition" do
    input  = "act-rep: abc"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:rep, input, 9, 12], result.take(4)

    assert_parse_elements [
      ["a", 9, []],
      ["b", 10, []],
      ["c", 11, []]
    ], result
  end

  it "makes nodes from a sequence" do
    input  = "act-seq: xyz"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:seq, input, 9, 12], result.take(4)

    assert_parse_elements [
      ["x", 9, []],
      ["y", 10, []],
      ["z", 11, []]
    ], result
  end

  it "makes nodes from a parenthesised expression" do
    input  = "act-paren: !"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:paren, input, 11, 12, []], result
  end

  it "binds to the options of a choice" do
    input  = "act-choice: 0"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]
    assert_equal [:zero, input, 12, 13, []], result

    input  = "act-choice: 42"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1]

    assert_equal [:int, input, 12, 14], result.take(4)

    assert_parse_elements [
      ["4", 12, []],
      ["2", 13, [
        ["2", 13, []]
      ]]
    ], result
  end

  it "treats null as a valid result" do
    result = NodeActions.parse("act-falsey: null", :actions => TestActions.new).elements[1]
    assert_nil result
  end

  it "treats false as a valid result" do
    result = NodeActions.parse("act-falsey: false", :actions => TestActions.new).elements[1]
    assert_equal false, result
  end

  it "treats zero as a valid result" do
    result = NodeActions.parse("act-falsey: 0", :actions => TestActions.new).elements[1]
    assert_equal 0, result
  end

  it "treats empty strings as a valid result" do
    result = NodeActions.parse("act-falsey: ''", :actions => TestActions.new).elements[1]
    assert_equal "", result
  end

  it "treats empty lists as a valid result" do
    result = NodeActions.parse("act-falsey: []", :actions => TestActions.new).elements[1]
    assert_equal [], result
  end

  it "treats falsey values as acceptable lookahead results" do
    input  = "act-falsey-pred: 0"
    result = NodeActions.parse(input, :actions => TestActions.new).elements[1].elements[1]

    assert_equal [:zero, input, 17, 18, []], result
  end

  it "treats falsey values as acceptable repetition results" do
    result = NodeActions.parse("act-falsey-rep: null0false''[]", :actions => TestActions.new)
    assert_equal [nil, 0, false, "", []], result.elements[1].elements
  end

  it "treats falsey values as acceptable maybe results" do
    result = NodeActions.parse("act-falsey-opt: null", :actions => TestActions.new)
    assert_nil result.elements[1]
  end

  it "treats falsey values as acceptable sequence results" do
    result = NodeActions.parse("act-falsey-seq: (null)", :actions => TestActions.new).elements[1]

    assert_equal 3, result.elements.size
    assert_nil result.elements[1]
  end

  it "treats falsey values as acceptable choice results" do
    result = NodeActions.parse("act-falsey-choice: null", :actions => TestActions.new).elements[1]
    assert_nil result
  end
end

class TestActions
  def make_str(*args)
    [:str, *args]
  end

  def make_char(*args)
    [:char, *args]
  end

  def make_any(*args)
    [:any, *args]
  end

  def make_maybe(*args)
    [:maybe, *args]
  end

  def make_rep(*args)
    [:rep, *args]
  end

  def make_seq(*args)
    [:seq, *args]
  end

  def make_paren(*args)
    [:paren, *args]
  end

  def make_zero(*args)
    [:zero, *args]
  end

  def make_int(*args)
    [:int, *args]
  end

  def make_null(*args)
    nil
  end

  def make_false(*args)
    false
  end

  def make_0(*args)
    0
  end

  def make_empty_str(*args)
    ""
  end

  def make_empty_list(*args)
    []
  end
end
