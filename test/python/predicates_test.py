from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import predicates


class PostiveLookAheadTest(TestCase, ParseHelper):
    def test_checks_the_first_character_of_a_word(self):
        self.assertParse(
            ("London", 10, [
                ("", 10, []),
                ("London", 10, [
                    ("L", 10, []),
                    ("o", 11, []),
                    ("n", 12, []),
                    ("d", 13, []),
                    ("o", 14, []),
                    ("n", 15, [])
                ])
            ]),
            predicates.parse("pos-name: London")
        )

    def test_rejects_words_where_the_predicate_does_not_match(self):
        with self.assertRaises(predicates.ParseError):
            predicates.parse("pos-name: london")

    def test_resets_the_cursor_after_matching(self):
        self.assertParse(
            ("<abc123>", 9, [
                ("", 9, []),
                ("<", 9, []),
                ("abc123", 10, [
                    ("a", 10, []),
                    ("b", 11, []),
                    ("c", 12, []),
                    ("1", 13, []),
                    ("2", 14, []),
                    ("3", 15, [])
                ]),
                (">", 16, [])
            ]),
            predicates.parse("pos-seq: <abc123>")
        )

    def test_uses_a_reference_as_a_predicate(self):
        self.assertParse(
            ("c99", 9, [
                ("", 9, []),
                ("c99", 9, [
                    ("c", 9, []),
                    ("9", 10, []),
                    ("9", 11, [])
                ])
            ]),
            predicates.parse("pos-ref: c99")
        )


class NegativeLookAheadTest(TestCase, ParseHelper):
    def test_checks_the_first_character_of_a_word(self):
        self.assertParse(
            ("word", 10, [
                ("", 10, []),
                ("word", 10, [
                    ("w", 10, []),
                    ("o", 11, []),
                    ("r", 12, []),
                    ("d", 13, [])
                ])
            ]),
            predicates.parse("neg-name: word")
        )

    def test_rejects_words_where_the_predicate_matches(self):
        with self.assertRaises(predicates.ParseError):
            predicates.parse("neg-name: Word")

    def test_checks_for_a_string_at_the_end(self):
        self.assertParse(
            ("word", 14, [
                ("word", 14, []),
                ("", 18, [])
            ]),
            predicates.parse("neg-tail-str: word")
        )

    def test_checks_for_a_class_at_the_end(self):
        self.assertParse(
            ("word", 16, [
                ("word", 16, []),
                ("", 20, [])
            ]),
            predicates.parse("neg-tail-class: word")
        )

    def test_checks_for_any_char_at_the_end(self):
        self.assertParse(
            ("word", 14, [
                ("word", 14, []),
                ("", 18, [])
            ]),
            predicates.parse("neg-tail-any: word")
        )

    def test_rejects_inputs_that_match_the_negative_pattern(self):
        with self.assertRaises(predicates.ParseError):
            predicates.parse("neg-tail-str: wordmore text")
        with self.assertRaises(predicates.ParseError):
            predicates.parse("neg-tail-class: words")
        with self.assertRaises(predicates.ParseError):
            predicates.parse("neg-tail-any: word ")
