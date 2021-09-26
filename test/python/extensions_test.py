from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import extensions


class ExtensionsTest(TestCase, ParseHelper):
    def test_adds_methods_to_a_string(self):
        input  = "ext-str: hello"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((0, ["h", "e", "l", "l", "o"]), result.ext_func())

    def test_adds_methods_to_a_char_class(self):
        input  = "ext-class: k"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((0, ["k"]), result.ext_func())

    def test_adds_methods_to_any_char(self):
        input  = "ext-any: ?"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((0, ["?"]), result.ext_func())

    def test_adds_methods_to_a_maybe_rule(self):
        input  = "ext-maybe: hello"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((0, ["h", "e", "l", "l", "o"]), result.ext_func())

    def test_adds_methods_to_a_repetition(self):
        input  = "ext-rep: abc"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((3, ["a", "b", "c"]), result.ext_func())

    def test_adds_methods_to_a_sequence(self):
        input  = "ext-seq: xyz"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((3, ["x", "y", "z"]), result.ext_func())

    def test_adds_methods_to_a_parenthesised_expression(self):
        input  = "ext-paren: !"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((0, ["!"]), result.ext_func())

    def test_adds_methods_to_the_options_of_a_choice(self):
        input  = "ext-choice: 0"
        result = extensions.parse(input, types=Types).elements[1]
        self.assertEqual((0, ["0"]), result.ext_func())

        input  = "ext-choice: 42"
        result = extensions.parse(input, types=Types).elements[1]
        self.assertEqual((2, ["4", "2"]), result.ext_func())

    def test_adds_methods_to_the_result_of_a_reference(self):
        input  = "ext-ref: hello"
        result = extensions.parse(input, types=Types).elements[1]

        self.assertEqual((0, ["h", "e", "l", "l", "o"]), result.ext_func())

class Types:
    class Ext(object):
        def ext_func(self):
            return (len(self.elements), list(self.text))
