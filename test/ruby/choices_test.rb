require "minitest/autorun"
require_relative "./parse_helper"
require_relative "../grammars/choices"

describe "choices" do
  include ParseHelper

  describe "containing strings" do
    it "parses any of the choice options" do
      assert_parse ["a", 12], Choices.parse("choice-abc: a")
      assert_parse ["b", 12], Choices.parse("choice-abc: b")
      assert_parse ["c", 12], Choices.parse("choice-abc: c")
    end

    it "rejects input matching none of the options" do
      assert_raises(Choices::ParseError) { Choices.parse("choice-abc: d") }
    end

    it "rejects superstrings of the options" do
      assert_raises(Choices::ParseError) { Choices.parse("choice-abc: ab") }
    end

    it "parses a choice as part of a sequence" do
      assert_parse \
        ["repeat", 12, [
          ["re", 12, []],
          ["peat", 14, []]
        ]],
        Choices.parse("choice-seq: repeat")
    end

    it "does not backtrack if later rules fail" do
      assert_raises(Choices::ParseError) { Choices.parse("choice-seq: reppeat") }
    end
  end

  describe "with repetition" do
    it "parses a different option on each iteration" do
      assert_parse \
        ["abcabba", 12, [
          ["a", 12, []],
          ["b", 13, []],
          ["c", 14, []],
          ["a", 15, []],
          ["b", 16, []],
          ["b", 17, []],
          ["a", 18, []]
        ]],
        Choices.parse("choice-rep: abcabba")
    end

    it "rejects if any iteration does not match the options" do
      assert_raises(Choices::ParseError) { Choices.parse("choice-rep: abcadba") }
    end
  end

  describe "containing sequences" do
    it "parses one branch of the choice" do
      assert_parse \
        ["ab", 13, [
          ["a", 13, []],
          ["b", 14, []]
        ]],
        Choices.parse("choice-bind: ab")
    end

    it "binds sequences tighter than choices" do
      assert_raises(Choices::ParseError) { Choices.parse("choice-bind: abef") }
    end
  end
end
