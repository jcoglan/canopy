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

  describe "single quoted strings" do
    it "parses that exact string" do
      assert_parse ["oat", 7], Terminals.parse("str-1: oat")
    end

    it "matches strings case-sensitively" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-1: OAT") }
    end

    it "rejects strings with additional prefixes" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-1: boat") }
    end

    it "rejects strings with additional suffxies" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-1: oath") }
    end

    it "rejects the empty string" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-1: ") }
    end

    it "rejects prefixes of the target string" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-1: oa") }
    end
  end

  describe "double quoted strings" do
    it "parses that exact string" do
      assert_parse ["oat", 7], Terminals.parse("str-2: oat")
    end

    it "matches strings case-sensitively" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-2: OAT") }
    end

    it "rejects strings with additional prefixes" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-2: boat") }
    end

    it "rejects strings with additional suffxies" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-2: oath") }
    end

    it "rejects the empty string" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-2: ") }
    end

    it "rejects prefixes of the target string" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-2: oa") }
    end
  end

  describe "case insensitive strings" do
    it "parses that exact string" do
      assert_parse ["oat", 8], Terminals.parse("str-ci: oat")
    end

    it "matches strings case-sensitively" do
      assert_parse ["OAT", 8], Terminals.parse("str-ci: OAT")
    end

    it "rejects strings with additional prefixes" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-ci: boat") }
    end

    it "rejects strings with additional suffxies" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-ci: oath") }
    end

    it "rejects the empty string" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-ci: ") }
    end

    it "rejects prefixes of the target string" do
      assert_raises(Terminals::ParseError) { Terminals.parse("str-ci: oa") }
    end
  end
end
