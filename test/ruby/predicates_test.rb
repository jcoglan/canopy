require "minitest/autorun"
require_relative "./parse_helper"
require_relative "../grammars/predicates"

describe "predicates" do
  include ParseHelper

  describe "positive look-ahead" do
    it "checks the first character of a word" do
      assert_parse \
        ["London", 10, [
          ["", 10, []],
          ["London", 10, [
            ["L", 10, []],
            ["o", 11, []],
            ["n", 12, []],
            ["d", 13, []],
            ["o", 14, []],
            ["n", 15, []]
          ]]
        ]],
        Predicates.parse("pos-name: London")
    end

    it "rejects words where the predicate does not match" do
      assert_raises(Predicates::ParseError) { Predicates.parse("pos-name: london") }
    end

    it "resets the cursor after matching" do
      assert_parse \
        ["<abc123>", 9, [
          ["", 9, []],
          ["<", 9, []],
          ["abc123", 10, [
            ["a", 10, []],
            ["b", 11, []],
            ["c", 12, []],
            ["1", 13, []],
            ["2", 14, []],
            ["3", 15, []]
          ]],
          [">", 16, []]
        ]],
        Predicates.parse("pos-seq: <abc123>")
    end

    it "uses a reference as a predicate" do
      assert_parse \
        ["c99", 9, [
          ["", 9, []],
          ["c99", 9, [
            ["c", 9, []],
            ["9", 10, []],
            ["9", 11, []]
          ]]
        ]],
        Predicates.parse("pos-ref: c99")
    end
  end

  describe "negative look-ahead" do
    it "checks the first character of a word" do
      assert_parse \
        ["word", 10, [
          ["", 10, []],
          ["word", 10, [
            ["w", 10, []],
            ["o", 11, []],
            ["r", 12, []],
            ["d", 13, []]
          ]]
        ]],
        Predicates.parse("neg-name: word")
    end

    it "rejects words where the predicate matches" do
      assert_raises(Predicates::ParseError) { Predicates.parse("neg-name: Word") }
    end

    it "checks for a string at the end" do
      assert_parse \
        ["word", 14, [
          ["word", 14, []],
          ["", 18, []]
        ]],
        Predicates.parse("neg-tail-str: word")
    end

    it "checks for a class at the end" do
      assert_parse \
        ["word", 16, [
          ["word", 16, []],
          ["", 20, []]
        ]],
        Predicates.parse("neg-tail-class: word")
    end

    it "checks for any char at the end" do
      assert_parse \
        ["word", 14, [
          ["word", 14, []],
          ["", 18, []]
        ]],
        Predicates.parse("neg-tail-any: word")
    end

    it "rejects inputs that match the negative pattern" do
      assert_raises(Predicates::ParseError) { Predicates.parse("neg-tail-str: wordmore text") }
      assert_raises(Predicates::ParseError) { Predicates.parse("neg-tail-class: words") }
      assert_raises(Predicates::ParseError) { Predicates.parse("neg-tail-any: word ") }
    end
  end
end
