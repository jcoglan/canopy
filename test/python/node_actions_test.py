from unittest import TestCase
from .parse_helper import ParseHelper
from grammars import node_actions


class NodeActionsTest(TestCase, ParseHelper):
    def test_makes_nodes_from_a_string(self):
        input  = "act-str: hello"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["str", input, 9, 14, []], result)

    def test_makes_nodes_from_a_char_class(self):
        input  = "act-class: k"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["char", input, 11, 12, []], result)

    def test_makes_nodes_from_any_char(self):
        input  = "act-any: ?"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["any", input, 9, 10, []], result)

    def test_makes_nodes_from_a_maybe_rule(self):
        input  = "act-maybe: hello"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["maybe", input, 11, 16, []], result)

    def test_does_not_invoke_an_action_for_a_maybe_rule_with_no_match(self):
        input  = "act-maybe: "
        self.assertParse(("", 11, []), node_actions.parse(input, actions=TestActions()))

    def test_makes_nodes_from_a_repetition(self):
        input  = "act-rep: abc"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["rep", input, 9, 12], result[0:4])

        self.assertParseElements([
            ("a", 9, []),
            ("b", 10, []),
            ("c", 11, [])
        ], result)

    def test_makes_nodes_from_a_sequence(self):
        input  = "act-seq: xyz"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["seq", input, 9, 12], result[0:4])

        self.assertParseElements([
            ("x", 9, []),
            ("y", 10, []),
            ("z", 11, [])
        ], result)

    def test_makes_nodes_from_a_parenthesised_expression(self):
        input  = "act-paren: !"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["paren", input, 11, 12, []], result)

    def test_binds_to_the_options_of_a_choice(self):
        input  = "act-choice: 0"
        result = node_actions.parse(input, actions=TestActions()).elements[1]
        self.assertEqual(["zero", input, 12, 13, []], result)

        input  = "act-choice: 42"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(["int", input, 12, 14], result[0:4])

        self.assertParseElements([
            ("4", 12, []),
            ("2", 13, [
                ("2", 13, [])
            ])
        ], result)

    def test_treats_null_as_a_valid_result(self):
        result = node_actions.parse("act-falsey: null", actions=TestActions()).elements[1]
        self.assertEqual(None, result)

    def test_treats_false_as_a_valid_result(self):
        result = node_actions.parse("act-falsey: false", actions=TestActions()).elements[1]
        self.assertEqual(False, result)

    def test_treats_zero_as_a_valid_result(self):
        result = node_actions.parse("act-falsey: 0", actions=TestActions()).elements[1]
        self.assertEqual(0, result)

    def test_treats_empty_strings_as_a_valid_result(self):
        result = node_actions.parse("act-falsey: ''", actions=TestActions()).elements[1]
        self.assertEqual("", result)

    def test_treats_empty_lists_as_a_valid_result(self):
        result = node_actions.parse("act-falsey: []", actions=TestActions()).elements[1]
        self.assertEqual([], result)

    def test_treats_falsey_values_as_acceptable_lookahead_results(self):
        input  = "act-falsey-pred: 0"
        result = node_actions.parse(input, actions=TestActions()).elements[1].elements[1]

        self.assertEqual(["zero", input, 17, 18, []], result)

    def test_treats_falsey_values_as_acceptable_repetition_results(self):
        result = node_actions.parse("act-falsey-rep: null0false''[]", actions=TestActions())
        self.assertEqual([None, 0, False, "", []], result.elements[1].elements)

    def test_treats_falsey_values_as_acceptable_maybe_results(self):
        input  = "act-falsey-opt: null"
        result = node_actions.parse(input, actions=TestActions()).elements[1]

        self.assertEqual(None, result)


class TestActions:
    def make_str(self, *args):
        return ["str"] + list(args)

    def make_char(self, *args):
        return ["char"] + list(args)

    def make_any(self, *args):
        return ["any"] + list(args)

    def make_maybe(self, *args):
        return ["maybe"] + list(args)

    def make_rep(self, *args):
        return ["rep"] + list(args)

    def make_seq(self, *args):
        return ["seq"] + list(args)

    def make_paren(self, *args):
        return ["paren"] + list(args)

    def make_zero(self, *args):
        return ["zero"] + list(args)

    def make_int(self, *args):
        return ["int"] + list(args)

    def make_null(*args):
        return None

    def make_false(*args):
        return False

    def make_0(*args):
        return 0

    def make_empty_str(*args):
        return ""

    def make_empty_list(*args):
        return []
