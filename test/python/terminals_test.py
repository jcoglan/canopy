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
