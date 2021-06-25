require "minitest/autorun"
require_relative "./parse_helper"
require_relative "../grammars/terminals"

describe "terminals" do
  include ParseHelper

  describe "any char" do
    it "parses any single character" do
      assert_parse ["a", 5], Terminals.parse("any: a")
      assert_parse ["!", 5], Terminals.parse("any: !")
    end

    it "rejects the empty string" do
      assert_raises(Terminals::ParseError) { Terminals.parse("any: ") }
    end

    it "rejects input with too many characters" do
      assert_raises(Terminals::ParseError) { Terminals.parse("any: ab") }
    end
  end

  describe "char class" do
    it "parses characters within the class" do
      assert_parse ["x", 11], Terminals.parse("pos-class: x")
    end

    it "rejects characters outside the class" do
      assert_raises(Terminals::ParseError) { Terminals.parse("pos-class: 0") }
    end

    it "matches characters case sensitively" do
      assert_raises(Terminals::ParseError) { Terminals.parse("pos-class: A") }
    end

    it "parses characters outside a negative class" do
      assert_parse ["0", 11], Terminals.parse("neg-class: 0")
    end

    it "rejects characters within a negative class" do
      assert_raises(Terminals::ParseError) { Terminals.parse("neg-class: x") }
    end
  end
end
