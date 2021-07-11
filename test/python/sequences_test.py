from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import sequences


class SequenceStringsTest(TestCase, ParseHelper):
    def test_parses_a_matching_sequence(self):
        self.assertParse(
            ("abc", 9, [
                ("a", 9, []),
                ("b", 10, []),
                ("c", 11, [])
            ]),
            sequences.parse("seq-str: abc")
        )

    def test_rejects_a_missing_prefix(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-str: bc")

    def test_rejects_an_additional_prefix(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-str: zabc")

    def test_rejects_a_missing_middle(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-str: ac")

    def test_rejects_an_additional_middle(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-str: azbzc")

    def test_rejects_a_missing_suffix(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-str: ab")

    def test_rejects_an_additional_suffix(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-str: abcz")


class SequenceMaybesTest(TestCase, ParseHelper):
    def test_parses_at_the_start(self):
        self.assertParse(
            ("bc", 13, [
                ("", 13, []),
                ("b", 13, []),
                ("c", 14, [])
            ]),
            sequences.parse("seq-maybe-1: bc")
        )

    def test_parses_in_the_middle(self):
        self.assertParse(
            ("ac", 13, [
                ("a", 13, []),
                ("", 14, []),
                ("c", 14, [])
            ]),
            sequences.parse("seq-maybe-2: ac")
        )

    def test_parses_at_the_end(self):
        self.assertParse(
            ("ab", 13, [
                ("a", 13, []),
                ("b", 14, []),
                ("", 15, [])
            ]),
            sequences.parse("seq-maybe-3: ab")
        )


class SequenceRepetitionTest(TestCase, ParseHelper):
    def test_allows_empty_matches(self):
        self.assertParse(
            ("0", 11, [
                ("", 11, []),
                ("0", 11, [])
            ]),
            sequences.parse("seq-rep-1: 0")
        )

    def test_allows_non_empty_matches(self):
        self.assertParse(
            ("abc0", 11, [
                ("abc", 11, [ ("a", 11, []), ("b", 12, []), ("c", 13, []) ]),
                ("0", 14, [])
            ]),
            sequences.parse("seq-rep-1: abc0")
        )

    def test_parses_repetitions_greedily(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-rep-2: aaa")


class SequenceRepeatedSubSequenceTest(TestCase, ParseHelper):
    def test_parses_a_nested_tree(self):
        self.assertParse(
            ("ab1b2b3c", 16, [
                ("a", 16, []),
                ("b1b2b3", 17, [
                    ("b1", 17, [ ("b", 17, []), ("1", 18, []) ]),
                    ("b2", 19, [ ("b", 19, []), ("2", 20, []) ]),
                    ("b3", 21, [ ("b", 21, []), ("3", 22, []) ])
                ]),
                ("c", 23, [])
            ]),
            sequences.parse("seq-rep-subseq: ab1b2b3c")
        )

    def test_rejects_the_input_if_the_sub_sequence_does_not_match(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-rep-subseq: ab1b2bc")


class SequenceLabellingTest(TestCase, ParseHelper):
    def test_creates_named_references_to_child_nodes(self):
        self.assertParse(
            ("v987", 11, [
                ("v", 11, []),
                ("987", 12, [ ("9", 12, []), ("8", 13, []), ("7", 14, []) ])
            ], {
                "num": ("987", 12, [ ("9", 12, []), ("8", 13, []), ("7", 14, []) ])
            }),
            sequences.parse("seq-label: v987")
        )

    def test_creates_named_references_inside_repeated_sub_sequences(self):
        self.assertParse(
            ("v.AB.CD.EF", 18, [
                ("v", 18, []),
                (".AB.CD.EF", 19, [
                    (".AB", 19, [
                        (".", 19),
                        ("AB", 20, [ ("A", 20, []), ("B", 21, []) ])
                    ], {
                        "part": ("AB", 20, [ ("A", 20, []), ("B", 21, []) ])
                    }),
                    (".CD", 22, [
                        (".", 22),
                        ("CD", 23, [ ("C", 23, []), ("D", 24, []) ])
                    ], {
                        "part": ("CD", 23, [ ("C", 23, []), ("D", 24, []) ])
                    }),
                    (".EF", 25, [
                        (".", 25),
                        ("EF", 26, [ ("E", 26, []), ("F", 27, []) ])
                    ], {
                        "part": ("EF", 26, [ ("E", 26, []), ("F", 27, []) ])
                    })
                ])
            ]),
            sequences.parse("seq-label-subseq: v.AB.CD.EF")
        )


class SequenceMutingTest(TestCase, ParseHelper):
    def test_removes_child_nodes_from_the_sequence(self):
        self.assertParse(
            ("key: 42", 12, [
                ("key", 12, [ ("k", 12, []), ("e", 13, []), ("y", 14, []) ]),
                ("42", 17, [ ("4", 17, []), ("2", 18, []) ])
            ]),
            sequences.parse("seq-mute-1: key: 42")
        )

    def test_removes_child_sequences_from_the_sequence(self):
        self.assertParse(
            ("key: 42", 12, [
                ("key", 12, [ ("k", 12, []), ("e", 13, []), ("y", 14, []) ]),
                ("42", 17, [ ("4", 17, []), ("2", 18, []) ])
            ]),
            sequences.parse("seq-mute-2: key: 42")
        )

    def test_removes_nodes_from_child_sequences(self):
        self.assertParse(
            ("v.AB.CD.EF", 12, [
                ("v", 12, []),
                (".AB.CD.EF", 13, [
                    (".AB", 13, [
                        ("AB", 14, [ ("A", 14, []), ("B", 15, []) ])
                    ]),
                    (".CD", 16, [
                        ("CD", 17, [ ("C", 17, []), ("D", 18, []) ])
                    ]),
                    (".EF", 19, [
                        ("EF", 20, [ ("E", 20, []), ("F", 21, []) ])
                    ])
                ])
            ]),
            sequences.parse("seq-mute-3: v.AB.CD.EF")
        )

    def test_correctly_handles_nested_expressions_using_mutes(self):
        self.assertParse(
            ("abcde", 12, [
                ("a", 12, []),
                ("e", 16, [])
            ]),
            sequences.parse("seq-mute-4: abcde")
        )

    def test_rejects_input_missing_muted_expressions(self):
        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-mute-4: ae")

        with self.assertRaises(sequences.ParseError):
            sequences.parse("seq-mute-4: abde")


class SequenceReferencesTest(TestCase, ParseHelper):
    def test_assigns_labels_to_reference_expressions(self):
        self.assertParse(
            ("ac", 10, [
                ("a", 10, []),
                ("c", 11, [])
            ], {
                "a": ("a", 10, []),
                "b": ("c", 11, []),
                "c": ("c", 11, [])
            }),
            sequences.parse("seq-refs: ac")
        )
