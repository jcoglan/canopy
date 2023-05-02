from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import choices


class ChoiceStringsTest(TestCase, ParseHelper):
    def test_parses_any_of_the_choice_options(self):
        self.assertParse(("a", 12), choices.parse("choice-abc: a"))
        self.assertParse(("b", 12), choices.parse("choice-abc: b"))
        self.assertParse(("c", 12), choices.parse("choice-abc: c"))

    def test_rejects_input_matching_none_of_the_options(self):
        with self.assertRaises(choices.ParseError):
            choices.parse("choice-abc: d")

    def test_rejects_superstrings_of_the_options(self):
        with self.assertRaises(choices.ParseError):
            choices.parse("choice-abc: ab")

    def test_parses_a_choice_as_part_of_a_sequence(self):
        self.assertParse(
            ("repeat", 12, [
                ("re", 12, []),
                ("peat", 14, [])
            ]),
            choices.parse("choice-seq: repeat")
        )

    def test_does_not_backtrack_if_later_rules_fail(self):
        with self.assertRaises(choices.ParseError):
            choices.parse("choice-seq: reppeat")


class ChoiceRepetitionTest(TestCase, ParseHelper):
    def test_parses_a_different_option_on_each_iteration(self):
        self.assertParse(
            ("abcabba", 12, [
                ("a", 12, []),
                ("b", 13, []),
                ("c", 14, []),
                ("a", 15, []),
                ("b", 16, []),
                ("b", 17, []),
                ("a", 18, [])
            ]),
            choices.parse("choice-rep: abcabba")
        )

    def test_rejects_if_any_iteration_does_not_match_the_options(self):
        with self.assertRaises(choices.ParseError):
            choices.parse("choice-rep: abcadba")


class ChoiceSequenceTest(TestCase, ParseHelper):
    def test_parses_one_branch_of_the_choice(self):
        self.assertParse(
            ("ab", 13, [
                ("a", 13, []),
                ("b", 14, [])
            ]),
            choices.parse("choice-bind: ab")
        )

    def test_binds_sequences_tighter_than_choices(self):
        with self.assertRaises(choices.ParseError):
            choices.parse("choice-bind: abef")
