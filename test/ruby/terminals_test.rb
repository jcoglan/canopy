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
end
