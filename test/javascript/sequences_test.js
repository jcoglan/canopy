const jstest      = require("jstest").Test
const ParseHelper = require("./parse_helper")
const Sequences   = require("../grammars/sequences")

jstest.describe("sequences", function() { with(this) {
  include(ParseHelper)

  describe("containing strings", function() { with(this) {
    it("parses a matching sequence", function() { with(this) {
      assertParse(
        ["abc", 9, [
          ["a", 9, []],
          ["b", 10, []],
          ["c", 11, []]
        ]],
        Sequences.parse("seq-str: abc")
      )
    }})

    it("rejects a missing prefix", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-str: bc"))
    }})

    it("rejects an additional prefix", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-str: zabc"))
    }})

    it("rejects a missing middle", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-str: ac"))
    }})

    it("rejects an additional middle", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-str: azbzc"))
    }})

    it("rejects a missing suffix", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-str: ab"))
    }})

    it("rejects an additional suffix", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-str: abcz"))
    }})
  }})

  describe("containing maybes", function() { with(this) {
    it("parses at the start", function() { with(this) {
      assertParse(
        ["bc", 13, [
          ["", 13, []],
          ["b", 13, []],
          ["c", 14, []]
        ]],
        Sequences.parse("seq-maybe-1: bc")
      )
    }})

    it("parses in the middle", function() { with(this) {
      assertParse(
        ["ac", 13, [
          ["a", 13, []],
          ["", 14, []],
          ["c", 14, []]
        ]],
        Sequences.parse("seq-maybe-2: ac")
      )
    }})

    it("parses at the end", function() { with(this) {
      assertParse(
        ["ab", 13, [
          ["a", 13, []],
          ["b", 14, []],
          ["", 15, []]
        ]],
        Sequences.parse("seq-maybe-3: ab")
      )
    }})
  }})

  describe("containing repetition", function() { with(this) {
    it("allows empty matches", function() { with(this) {
      assertParse(
        ["0", 11, [
          ["", 11, []],
          ["0", 11, []]
        ]],
        Sequences.parse("seq-rep-1: 0")
      )
    }})

    it("allows non-empty matches", function() { with(this) {
      assertParse(
        ["abc0", 11, [
          ["abc", 11, [ ["a", 11, []], ["b", 12, []], ["c", 13, []] ]],
          ["0", 14, []]
        ]],
        Sequences.parse("seq-rep-1: abc0")
      )
    }})

    it("parses repetitions greedily", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-rep-2: aaa"))
    }})
  }})

  describe("containing repeated sub-sequences", function() { with(this) {
    it("parses a nested tree", function() { with(this) {
      assertParse(
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
      )
    }})

    it("rejects the input if the sub-sequence does not match", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-rep-subseq: ab1b2bc"))
    }})
  }})

  describe("labelling", function() { with(this) {
    it("creates named references to child nodes", function() { with(this) {
      assertParse(
        ["v987", 11, [
          ["v", 11, []],
          ["987", 12, [ ["9", 12, []], ["8", 13, []], ["7", 14, []] ]]
        ], {
          num: ["987", 12, [ ["9", 12, []], ["8", 13, []], ["7", 14, []] ]]
        }],
        Sequences.parse("seq-label: v987")
      )
    }})

    it("creates named references inside repeated sub-sequences", function() { with(this) {
      assertParse(
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
      )
    }})
  }})

  describe("muting", function() { with(this) {
    it("removes child nodes from the sequence", function() { with(this) {
      assertParse(
        ["key: 42", 12, [
          ["key", 12, [ ["k", 12, []], ["e", 13, []], ["y", 14, []] ]],
          ["42", 17, [ ["4", 17, []], ["2", 18, []] ]]
        ]],
        Sequences.parse("seq-mute-1: key: 42")
      )
    }})

    it("removes child sequences from the sequence", function() { with(this) {
      assertParse(
        ["key: 42", 12, [
          ["key", 12, [ ["k", 12, []], ["e", 13, []], ["y", 14, []] ]],
          ["42", 17, [ ["4", 17, []], ["2", 18, []] ]]
        ]],
        Sequences.parse("seq-mute-2: key: 42")
      )
    }})

    it("removes nodes from child sequences", function() { with(this) {
      assertParse(
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
      )
    }})

    it("correctly handles nested expressions using mutes", function() { with(this) {
      assertParse(
        ["abcde", 12, [
          ["a", 12, []],
          ["e", 16, []]
        ]],
        Sequences.parse("seq-mute-4: abcde")
      )
    }})

    it("allows the first element to be muted", function() { with(this) {
      assertParse(
        ["abc", 16, [
          ["b", 17, []],
          ["c", 18, []]
        ]],
        Sequences.parse("seq-mute-first: abc")
      )
    }})

    it("allows the last element to be muted", function() { with(this) {
      assertParse(
        ["abc", 15, [
          ["a", 15, []],
          ["b", 16, []]
        ]],
        Sequences.parse("seq-mute-last: abc")
      )
    }})

    it("rejects input missing muted expressions", function() { with(this) {
      assertThrows(SyntaxError, () => Sequences.parse("seq-mute-4: ae"))
      assertThrows(SyntaxError, () => Sequences.parse("seq-mute-4: abde"))
    }})
  }})

  describe("containing references", function() { with(this) {
    it("assigns labels to reference expressions", function() { with(this) {
      assertParse(
        ["ac", 10, [
          ["a", 10, []],
          ["c", 11, []]
        ], {
          a: ["a", 10, []],
          b: ["c", 11, []],
          c: ["c", 11, []]
        }],
        Sequences.parse("seq-refs: ac")
      )
    }})

    it("mutes references from generating labels", function() { with(this) {
      let tree = Sequences.parse("seq-mute-refs: ac")

      assertParse(
        ["ac", 15, [
          ["a", 15, []]
        ], {
          a: ["a", 15, []]
        }],
        tree
      )
      assert(!('c' in tree))
    }})
  }})
}})
