require "minitest/autorun"
require_relative "./parse_helper"
require_relative "../grammars/extensions"

describe "extensions" do
  include ParseHelper

  it "adds methods to a string" do
    input  = "ext-str: hello"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [0, ["h", "e", "l", "l", "o"]], result.ext_func
  end

  it "adds methods to a char class" do
    input  = "ext-class: k"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [0, ["k"]], result.ext_func
  end

  it "adds methods to any char" do
    input  = "ext-any: ?"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [0, ["?"]], result.ext_func
  end

  it "adds methods to a maybe rule" do
    input  = "ext-maybe: hello"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [0, ["h", "e", "l", "l", "o"]], result.ext_func
  end

  it "adds methods to a repetition" do
    input  = "ext-rep: abc"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [3, ["a", "b", "c"]], result.ext_func
  end

  it "adds methods to a sequence" do
    input  = "ext-seq: xyz"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [3, ["x", "y", "z"]], result.ext_func
  end

  it "adds methods to a parenthesised expression" do
    input  = "ext-paren: !"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [0, ["!"]], result.ext_func
  end

  it "adds methods to the options of a choice" do
    input  = "ext-choice: 0"
    result = Extensions.parse(input, :types => Types).elements[1]
    assert_equal [0, ["0"]], result.ext_func

    input  = "ext-choice: 42"
    result = Extensions.parse(input, :types => Types).elements[1]
    assert_equal [2, ["4", "2"]], result.ext_func
  end

  it "adds methods to the result of a reference" do
    input  = "ext-ref: hello"
    result = Extensions.parse(input, :types => Types).elements[1]

    assert_equal [0, ["h", "e", "l", "l", "o"]], result.ext_func
  end
end

class Types
  module Ext
    def ext_func
      [elements.size, text.chars]
    end
  end
end
