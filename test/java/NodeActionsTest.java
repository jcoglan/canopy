package canopy.node_actions;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

import helpers.ElementsSpec;
import helpers.Node;
import helpers.NodeSpec;

import test.grammars.node_actions.Actions;
import test.grammars.node_actions.Label;
import test.grammars.node_actions.ParseError;
import test.grammars.node_actions.NodeActions;
import test.grammars.node_actions.TreeNode;

class NodeActionsTest extends ParseHelper {
    @Test
    void makesNodesFromAString() throws ParseError {
        String input = "act-str: hello";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("str", input, 9, 14).noElems(), result);
    }

    @Test
    void makesNodesFromACharClass() throws ParseError {
        String input = "act-class: k";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("char", input, 11, 12).noElems(), result);
    }

    @Test
    void makesNodesFromAnyChar() throws ParseError {
        String input = "act-any: ?";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("any", input, 9, 10).noElems(), result);
    }

    @Test
    void makesNodesFromAMaybeRule() throws ParseError {
        String input = "act-maybe: hello";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("maybe", input, 11, 16).noElems(), result);
    }

    @Test
    void doesNotInvokeAnActionForAMaybeRuleWithNoMatch() throws ParseError {
        String input = "act-maybe: ";
        TreeNode result = NodeActions.parse(input, new TestActions());

        expect(result).toMatch(node("", 11).noElems());
    }

    @Test
    void makesNodesFromARepetition() throws ParseError {
        String input = "act-rep: abc";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(
            new CustomNode("rep", input, 9, 12)
                .elem(node("a", 9).noElems())
                .elem(node("b", 10).noElems())
                .elem(node("c", 11).noElems()),
            result
        );
    }

    @Test
    void makesNodesFromASequence() throws ParseError {
        String input = "act-seq: xyz";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(
            new CustomNode("seq", input, 9, 12)
                .elem(node("x", 9).noElems())
                .elem(node("y", 10).noElems())
                .elem(node("z", 11).noElems()),
            result
        );
    }

    @Test
    void makesNodesFromAParenthesisedExpression() throws ParseError {
        String input = "act-paren: !";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("paren", input, 11, 12).noElems(), result);
    }

    @Test
    void bindsToTheOptionsOfAChoice() throws ParseError {
        String input = "act-choice: 0";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);
        assertNode(new CustomNode("zero", input, 12, 13).noElems(), result);

        input = "act-choice: 42";
        result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(
            new CustomNode("int", input, 12, 14)
                .elem(node("4", 12).noElems())
                .elem(node("2", 13)
                    .elem(node("2", 13).noElems())
                ),
            result
        );
    }

    @Test
    void treatsNullAsAValidResult() throws ParseError {
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: null", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    @Test
    void treatsFalseAsAValidResult() throws ParseError {
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: false", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    @Test
    void treatsZeroAsAValidResult() throws ParseError {
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: 0", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    @Test
    void treatsEmptyStringsAsAValidResult() throws ParseError {
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: ''", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    @Test
    void treatsEmptyListsAsAValidResult() throws ParseError {
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: []", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    @Test
    void treatsFalseyValuesAsAcceptableLookaheadResults() throws ParseError {
        String input = "act-falsey-pred: 0";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1).elements.get(1);

        assertNode(new CustomNode("zero", input, 17, 18).noElems(), result);
    }

    @Test
    void treatsFalseyValuesAsAcceptableRepetitionResults() throws ParseError {
        String input = "act-falsey-rep: null0false''[]";
        List<TreeNode> elements = NodeActions.parse(input, new TestActions()).elements.get(1).elements;

        assertEquals(5, elements.size());
        for (TreeNode elem : elements) {
            assertEquals(null, elem);
        }
    }
}

class TestActions implements Actions {
    public CustomNode make_str(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("str", input, start, end, elements);
    }

    public CustomNode make_char(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("char", input, start, end, elements);
    }

    public CustomNode make_any(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("any", input, start, end, elements);
    }

    public CustomNode make_maybe(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("maybe", input, start, end, elements);
    }

    public CustomNode make_rep(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("rep", input, start, end, elements);
    }

    public CustomNode make_seq(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("seq", input, start, end, elements);
    }

    public CustomNode make_paren(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("paren", input, start, end, elements);
    }

    public CustomNode make_zero(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("zero", input, start, end, elements);
    }

    public CustomNode make_int(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("int", input, start, end, elements);
    }

    public CustomNode make_null(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public CustomNode make_false(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public CustomNode make_0(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public CustomNode make_empty_str(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public CustomNode make_empty_list(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }
}

class CustomNode extends TreeNode {
    String type, input;
    int start, end;
    List<TreeNode> elements;
    ElementsSpec<Label> elemsSpec = new ElementsSpec<Label>();

    CustomNode(String type, String input, int start, int end) {
        this(type, input, start, end, null);
    }

    CustomNode(String type, String input, int start, int end, List<TreeNode> elements) {
        this.type = type;
        this.input = input;
        this.start = start;
        this.end = end;
        this.elements = elements;
    }

    CustomNode noElems() {
        elemsSpec.noElems();
        return this;
    }

    CustomNode elem(NodeSpec<Label> elem) {
        elemsSpec.elem(elem);
        return this;
    }
}

class ParseHelper {
    Node<Label> expect(TreeNode node) {
        return new NodeWrapper(node.elements.get(1));
    }

    NodeSpec<Label> node(String text, int offset) {
        return new NodeSpec<Label>(text, offset);
    }

    void assertNode(CustomNode expected, CustomNode actual) {
        assertEquals(expected.type, actual.type);
        assertEquals(expected.input, actual.input);
        assertEquals(expected.start, actual.start);
        assertEquals(expected.end, actual.end);
        expected.elemsSpec.check(new NodeWrapper(new TreeNode("", 0, actual.elements)));
    }
}

class NodeWrapper implements Node<Label> {
    private TreeNode node;

    NodeWrapper(TreeNode node) {
        this.node = node;
    }

    public String text() {
        return node.text;
    }

    public int offset() {
        return node.offset;
    }

    public List<Node<Label>> elements() {
        return node.elements.stream()
            .map((elem) -> new NodeWrapper(elem))
            .collect(Collectors.toList());
    }

    public Node<Label> get(Label key) {
        return new NodeWrapper(node.get(key));
    }
}
