from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import terminals


class AnyCharTest(TestCase, ParseHelper):
    def test_parses_any_single_character(self):
        self.assertParse(("a", 5), terminals.parse("any: a"))
        self.assertParse(("!", 5), terminals.parse("any: !"))

    def test_rejects_the_empty_string(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("any: ")

    def test_rejects_input_with_too_many_characters(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("any: ab")


class CharClassTest(TestCase, ParseHelper):
    def test_parses_characters_within_the_class(self):
        self.assertParse(("x", 11), terminals.parse("pos-class: x"))

    def test_rejects_characters_outside_the_class(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("pos-class: 0")

    def test_matches_characters_case_sensitively(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("pos-class: A")

    def test_parses_characters_outside_a_negative_class(self):
        self.assertParse(("0", 11), terminals.parse("neg-class: 0"))

    def test_rejects_characters_within_a_negative_class(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("neg-class: x")


class SingleQuotedStringTest(TestCase, ParseHelper):
    def test_parses_that_exact_string(self):
        self.assertParse(("oat", 7), terminals.parse("str-1: oat"))

    def test_matches_strings_case_sensitively(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-1: OAT")

    def test_rejects_strings_with_additional_prefixes(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-1: boat")

    def test_rejects_strings_with_additional_suffixes(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-1: oath")

    def test_rejects_the_empty_string(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-1: ")

    def test_rejects_prefixes_of_the_target_string(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-1: oa")


class DoubleQuotedStringTest(TestCase, ParseHelper):
    def test_parses_that_exact_string(self):
        self.assertParse(("oat", 7), terminals.parse("str-2: oat"))

    def test_matches_strings_case_sensitively(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-2: OAT")

    def test_rejects_strings_with_additional_prefixes(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-2: boat")

    def test_rejects_strings_with_additional_suffixes(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-2: oath")

    def test_rejects_the_empty_string(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-2: ")

    def test_rejects_prefixes_of_the_target_string(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-2: oa")


class CaseInsensitiveStringTest(TestCase, ParseHelper):
    def test_parses_that_exact_string(self):
        self.assertParse(("oat", 8), terminals.parse("str-ci: oat"))

    def test_matches_strings_case_insensitively(self):
        self.assertParse(("OAT", 8), terminals.parse("str-ci: OAT"))

    def test_rejects_strings_with_additional_prefixes(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-ci: boat")

    def test_rejects_strings_with_additional_suffixes(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-ci: oath")

    def test_rejects_the_empty_string(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-ci: ")

    def test_rejects_prefixes_of_the_target_string(self):
        with self.assertRaises(terminals.ParseError):
            terminals.parse("str-ci: oa")
