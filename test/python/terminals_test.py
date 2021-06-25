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
