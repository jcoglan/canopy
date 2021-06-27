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
