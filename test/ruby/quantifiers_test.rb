require "minitest/autorun"
require_relative "./parse_helper"
require_relative "../grammars/quantifiers"

describe "quantifiers" do
  include ParseHelper

  describe "maybe" do
    it "parses a matching character" do
      assert_parse ["4", 7, []], Quantifiers.parse("maybe: 4")
    end

    it "parses the empty string" do
      assert_parse ["", 7, []], Quantifiers.parse("maybe: ")
    end

    it "rejects a non-matching character" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("maybe: a") }
    end
  end

  describe "rep-0" do
    it "parses the empty string" do
      assert_parse ["", 7, []], Quantifiers.parse("rep-0: ")
    end

    it "parses one occurence of the pattern" do
      assert_parse \
        ["z", 7, [
          ["z", 7, []]
        ]],
        Quantifiers.parse("rep-0: z")
    end

    it "parses many occurences of the same instance of the pattern" do
      assert_parse \
        ["zzzz", 7, [
          ["z", 7, []],
          ["z", 8, []],
          ["z", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-0: zzzz")
    end

    it "parses many occurences of different instances of the pattern" do
      assert_parse \
        ["wxyz", 7, [
          ["w", 7, []],
          ["x", 8, []],
          ["y", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-0: wxyz")
    end

    it "rejects strings with a non-matching prefix" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("rep-0: 4x") }
    end

    it "rejects strings with a non-matching suffix" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("rep-0: x4") }
    end

    it "parses repeating patterns greedily" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("greedy-0: xy") }
    end
  end

  describe "rep-1" do
    it "rejects the empty string" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("rep-1: ") }
    end

    it "parses one occurence of the pattern" do
      assert_parse \
        ["z", 7, [
          ["z", 7, []]
        ]],
        Quantifiers.parse("rep-1: z")
    end

    it "parses many occurences of the same instance of the pattern" do
      assert_parse \
        ["zzzz", 7, [
          ["z", 7, []],
          ["z", 8, []],
          ["z", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-1: zzzz")
    end

    it "parses many occurences of different instances of the pattern" do
      assert_parse \
        ["wxyz", 7, [
          ["w", 7, []],
          ["x", 8, []],
          ["y", 9, []],
          ["z", 10, []]
        ]],
        Quantifiers.parse("rep-1: wxyz")
    end

    it "rejects strings with a non-matching prefix" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("rep-1: 4x") }
    end

    it "rejects strings with a non-matching suffix" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("rep-1: x4") }
    end

    it "parses repeating patterns greedily" do
      assert_raises(Quantifiers::ParseError) { Quantifiers.parse("greedy-1: xy") }
    end

    it "parses a repeated reference" do
      assert_parse \
        ["#abc123", 11, [
          ["#", 11, []],
          ["abc123", 12, [
            ["a", 12, []],
            ["b", 13, []],
            ["c", 14, []],
            ["1", 15, []],
            ["2", 16, []],
            ["3", 17, []]
          ]]
        ]],
        Quantifiers.parse("color-ref: #abc123")
    end

    it "parses a repeated choice" do
      assert_parse \
        ["#abc123", 14, [
          ["#", 14, []],
          ["abc123", 15, [
            ["a", 15, []],
            ["b", 16, []],
            ["c", 17, []],
            ["1", 18, []],
            ["2", 19, []],
            ["3", 20, []]
          ]]
        ]],
        Quantifiers.parse("color-choice: #abc123")
    end
  end
end
