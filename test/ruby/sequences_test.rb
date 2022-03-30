require "minitest/autorun"
require_relative "./parse_helper"
require_relative "../grammars/sequences"

describe "sequences" do
  include ParseHelper

  describe "containing strings" do
    it "parses a matching sequence" do
      assert_parse \
        ["abc", 9, [
          ["a", 9, []],
          ["b", 10, []],
          ["c", 11, []]
        ]],
        Sequences.parse("seq-str: abc")
    end

    it "rejects a missing prefix" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-str: bc") }
    end

    it "rejects an additional prefix" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-str: zabc") }
    end

    it "rejects a missing middle" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-str: ac") }
    end

    it "rejects an additional middle" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-str: azbzc") }
    end

    it "rejects a missing suffix" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-str: ab") }
    end

    it "rejects an additional suffix" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-str: abcz") }
    end
  end

  describe "containing maybes" do
    it "parses at the start" do
      assert_parse \
        ["bc", 13, [
          ["", 13, []],
          ["b", 13, []],
          ["c", 14, []]
        ]],
        Sequences.parse("seq-maybe-1: bc")
    end

    it "parses in the middle" do
      assert_parse \
        ["ac", 13, [
          ["a", 13, []],
          ["", 14, []],
          ["c", 14, []]
        ]],
        Sequences.parse("seq-maybe-2: ac")
    end

    it "parses at the end" do
      assert_parse \
        ["ab", 13, [
          ["a", 13, []],
          ["b", 14, []],
          ["", 15, []]
        ]],
        Sequences.parse("seq-maybe-3: ab")
    end
  end

  describe "containing repetition" do
    it "allows empty matches" do
      assert_parse \
        ["0", 11, [
          ["", 11, []],
          ["0", 11, []]
        ]],
        Sequences.parse("seq-rep-1: 0")
    end

    it "allows non-empty matches" do
      assert_parse \
        ["abc0", 11, [
          ["abc", 11, [ ["a", 11, []], ["b", 12, []], ["c", 13, []] ]],
          ["0", 14, []]
        ]],
        Sequences.parse("seq-rep-1: abc0")
    end

    it "parses repetitions greedily" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-rep-2: aaa") }
    end
  end

  describe "containing repeated sub-sequences" do
    it "parses a nested tree" do
      assert_parse \
        ["ab1b2b3c", 16, [
          ["a", 16, []],
          ["b1b2b3", 17, [
            ["b1", 17, [ ["b", 17, []], ["1", 18, []] ]],
            ["b2", 19, [ ["b", 19, []], ["2", 20, []] ]],
            ["b3", 21, [ ["b", 21, []], ["3", 22, []] ]]
          ]],
          ["c", 23, []]
        ]],
        Sequences.parse("seq-rep-subseq: ab1b2b3c")
    end

    it "rejects the input if the sub-sequence does not match" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-rep-subseq: ab1b2bc") }
    end
  end

  describe "labelling" do
    it "creates named references to child nodes" do
      assert_parse \
        ["v987", 11, [
          ["v", 11, []],
          ["987", 12, [ ["9", 12, []], ["8", 13, []], ["7", 14, []] ]]
        ], {
          num: ["987", 12, [ ["9", 12, []], ["8", 13, []], ["7", 14, []] ]]
        }],
        Sequences.parse("seq-label: v987")
    end

    it "creates named references inside repeated sub-sequences" do
      assert_parse \
        ["v.AB.CD.EF", 18, [
          ["v", 18, []],
          [".AB.CD.EF", 19, [
            [".AB", 19, [
              [".", 19],
              ["AB", 20, [ ["A", 20, []], ["B", 21, []] ]]
            ], {
              part: ["AB", 20, [ ["A", 20, []], ["B", 21, []] ]]
            }],
            [".CD", 22, [
              [".", 22],
              ["CD", 23, [ ["C", 23, []], ["D", 24, []] ]]
            ], {
              part: ["CD", 23, [ ["C", 23, []], ["D", 24, []] ]]
            }],
            [".EF", 25, [
              [".", 25],
              ["EF", 26, [ ["E", 26, []], ["F", 27, []] ]]
            ], {
              part: ["EF", 26, [ ["E", 26, []], ["F", 27, []] ]]
            }]
          ]]
        ]],
        Sequences.parse("seq-label-subseq: v.AB.CD.EF")
    end
  end

  describe "muting" do
    it "removes child nodes from the sequence" do
      assert_parse \
        ["key: 42", 12, [
          ["key", 12, [ ["k", 12, []], ["e", 13, []], ["y", 14, []] ]],
          ["42", 17, [ ["4", 17, []], ["2", 18, []] ]]
        ]],
        Sequences.parse("seq-mute-1: key: 42")
    end

    it "removes child sequences from the sequence" do
      assert_parse \
        ["key: 42", 12, [
          ["key", 12, [ ["k", 12, []], ["e", 13, []], ["y", 14, []] ]],
          ["42", 17, [ ["4", 17, []], ["2", 18, []] ]]
        ]],
        Sequences.parse("seq-mute-2: key: 42")
    end

    it "removes nodes from child sequences" do
      assert_parse \
        ["v.AB.CD.EF", 12, [
          ["v", 12, []],
          [".AB.CD.EF", 13, [
            [".AB", 13, [
              ["AB", 14, [ ["A", 14, []], ["B", 15, []] ]]
            ]],
            [".CD", 16, [
              ["CD", 17, [ ["C", 17, []], ["D", 18, []] ]]
            ]],
            [".EF", 19, [
              ["EF", 20, [ ["E", 20, []], ["F", 21, []] ]]
            ]]
          ]]
        ]],
        Sequences.parse("seq-mute-3: v.AB.CD.EF")
    end

    it "correctly handles nested expressions using mutes" do
      assert_parse \
        ["abcde", 12, [
          ["a", 12, []],
          ["e", 16, []]
        ]],
        Sequences.parse("seq-mute-4: abcde")
    end

    it "allows the first element to be muted" do
      assert_parse \
        ["abc", 16, [
          ["b", 17, []],
          ["c", 18, []]
        ]],
        Sequences.parse("seq-mute-first: abc")
    end

    it "allows the last element to be muted" do
      assert_parse \
        ["abc", 15, [
          ["a", 15, []],
          ["b", 16, []]
        ]],
        Sequences.parse("seq-mute-last: abc")
    end

    it "rejects input missing muted expressions" do
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-mute-4: ae") }
      assert_raises(Sequences::ParseError) { Sequences.parse("seq-mute-4: abde") }
    end
  end

  describe "containing references" do
    it "assigns labels to reference expressions" do
      assert_parse \
        ["ac", 10, [
          ["a", 10, []],
          ["c", 11, []]
        ], {
          a: ["a", 10, []],
          b: ["c", 11, []],
          c: ["c", 11, []]
        }],
        Sequences.parse("seq-refs: ac")
    end

    it "mutes references from generating labels" do
      tree = Sequences.parse("seq-mute-refs: ac")

      assert_parse \
        ["ac", 15, [
          ["a", 15, []],
        ], {
          a: ["a", 15, []],
        }],
        tree

      assert !tree.respond_to?(:c)
    end
  end
end
