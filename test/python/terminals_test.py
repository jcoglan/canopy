from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import terminals

class AnyCharTest(TestCase, ParseHelper):
    def test_parses_any_single_character(self):
        self.assertParse(("a", 5), terminals.parse("any: a"))
        self.assertParse(("!", 5), terminals.parse("any: !"))
