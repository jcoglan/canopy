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
end
