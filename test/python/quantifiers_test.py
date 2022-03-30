from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import quantifiers


class MaybeTest(TestCase, ParseHelper):
    def test_parses_a_matching_character(self):
        self.assertParse(("4", 7, []), quantifiers.parse("maybe: 4"))

    def test_parses_the_empty_string(self):
        self.assertParse(("", 7, []), quantifiers.parse("maybe: "))

    def test_rejects_a_non_matching_string(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("maybe: a")


class ZeroOrMoreTest(TestCase, ParseHelper):
    def test_parses_the_empty_string(self):
        self.assertParse(("", 7, []), quantifiers.parse("rep-0: "))

    def test_parses_one_occurrence_of_the_pattern(self):
        self.assertParse(
            ("z", 7, [
                ("z", 7, [])
            ]),
            quantifiers.parse("rep-0: z")
        )

    def test_parses_many_occurrences_of_the_same_instance_of_the_pattern(self):
        self.assertParse(
            ("zzzz", 7, [
                ("z", 7, []),
                ("z", 8, []),
                ("z", 9, []),
                ("z", 10, [])
            ]),
            quantifiers.parse("rep-0: zzzz")
        )

    def test_parses_many_occurrences_of_different_instances_of_the_pattern(self):
        self.assertParse(
            ("wxyz", 7, [
                ("w", 7, []),
                ("x", 8, []),
                ("y", 9, []),
                ("z", 10, [])
            ]),
            quantifiers.parse("rep-0: wxyz")
        )

    def test_rejects_strings_with_a_non_matching_prefix(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-0: 4x")

    def test_rejects_strings_with_a_non_matching_suffix(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-0: x4")

    def test_parses_repeating_patterns_greedily(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("greedy-0: xy")


class OneOrMoreTest(TestCase, ParseHelper):
    def test_rejects_the_empty_string(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-1: ")

    def test_parses_one_occurrence_of_the_pattern(self):
        self.assertParse(
            ("z", 7, [
                ("z", 7, [])
            ]),
            quantifiers.parse("rep-1: z")
        )

    def test_parses_many_occurrences_of_the_same_instance_of_the_pattern(self):
        self.assertParse(
            ("zzzz", 7, [
                ("z", 7, []),
                ("z", 8, []),
                ("z", 9, []),
                ("z", 10, [])
            ]),
            quantifiers.parse("rep-1: zzzz")
        )

    def test_parses_many_occurrences_of_different_instances_of_the_pattern(self):
        self.assertParse(
            ("wxyz", 7, [
                ("w", 7, []),
                ("x", 8, []),
                ("y", 9, []),
                ("z", 10, [])
            ]),
            quantifiers.parse("rep-1: wxyz")
        )

    def test_rejects_strings_with_a_non_matching_prefix(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-1: 4x")

    def test_rejects_strings_with_a_non_matching_suffix(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-1: x4")

    def test_parses_repeating_patterns_greedily(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("greedy-1: xy")

    def test_parses_a_repeated_reference(self):
        self.assertParse(
            ("#abc123", 11, [
                ("#", 11, []),
                ("abc123", 12, [
                    ("a", 12, []),
                    ("b", 13, []),
                    ("c", 14, []),
                    ("1", 15, []),
                    ("2", 16, []),
                    ("3", 17, [])
                ])
            ]),
            quantifiers.parse("color-ref: #abc123")
        )

    def test_parses_a_repeated_choice(self):
        self.assertParse(
            ("#abc123", 14, [
                ("#", 14, []),
                ("abc123", 15, [
                    ("a", 15, []),
                    ("b", 16, []),
                    ("c", 17, []),
                    ("1", 18, []),
                    ("2", 19, []),
                    ("3", 20, [])
                ])
            ]),
            quantifiers.parse("color-choice: #abc123")
        )


class ExactlyTest(TestCase, ParseHelper):
    def test_rejects_the_empty_string(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-exact: ")

    def test_parses_the_required_number_of_the_pattern(self):
        self.assertParse(
            ("abc", 11, [
                ("a", 11, []),
                ("b", 12, []),
                ("c", 13, [])
            ]),
            quantifiers.parse("rep-exact: abc")
        )

    def test_rejects_too_few_copies_of_the_pattern(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-exact: ab")

    def test_rejects_too_many_copies_of_the_pattern(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-exact: abcd")


class MinimumTest(TestCase, ParseHelper):
    def test_rejects_the_empty_string(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-min: ")

    def test_parses_the_minimum_number_of_the_pattern(self):
        self.assertParse(
            ("abc", 9, [
                ("a", 9, []),
                ("b", 10, []),
                ("c", 11, [])
            ]),
            quantifiers.parse("rep-min: abc")
        )

    def test_parses_more_copies_of_the_pattern(self):
        self.assertParse(
            ("abcdef", 9, [
                ("a", 9, []),
                ("b", 10, []),
                ("c", 11, []),
                ("d", 12, []),
                ("e", 13, []),
                ("f", 14, [])
            ]),
            quantifiers.parse("rep-min: abcdef")
        )

    def test_rejects_too_few_copies_of_the_pattern(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-min: ab")


class RangeTest(TestCase, ParseHelper):
    def test_rejects_the_empty_string(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-range: ")

    def test_parses_the_minimum_number_of_the_pattern(self):
        self.assertParse(
            ("abc", 11, [
                ("a", 11, []),
                ("b", 12, []),
                ("c", 13, [])
            ]),
            quantifiers.parse("rep-range: abc")
        )

    def test_parses_the_maximum_number_of_the_pattern(self):
        self.assertParse(
            ("abcde", 11, [
                ("a", 11, []),
                ("b", 12, []),
                ("c", 13, []),
                ("d", 14, []),
                ("e", 15, [])
            ]),
            quantifiers.parse("rep-range: abcde")
        )

    def test_rejects_too_few_copies_of_the_pattern(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-range: ab")

    def test_rejects_too_many_copies_of_the_pattern(self):
        with self.assertRaises(quantifiers.ParseError):
            quantifiers.parse("rep-range: abcdef")
