//package canopy.node_actions;

using System.Collections.Generic;
using System.Collections;

using Microsoft.VisualStudio.TestTools.UnitTesting;

//import helpers.ElementsSpec;
//import helpers.Node;
//import helpers.NodeSpec;

using test.grammars.node_actions.Actions;
using test.grammars.node_actions.Label;
using test.grammars.node_actions.ParseError;
using test.grammars.node_actions.NodeActions;
using test.grammars.node_actions.TreeNode;
[TestClass]
class NodeActionsTest : ParseHelper {
    [TestMethod]
    void makesNodesFromAString(){
        String input = "act-str: hello";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("str", input, 9, 14).noElems(), result);
    }

    [TestMethod]
    void makesNodesFromACharClass(){
        String input = "act-class: k";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("char", input, 11, 12).noElems(), result);
    }

    [TestMethod]
    void makesNodesFromAnyChar(){
        String input = "act-any: ?";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("any", input, 9, 10).noElems(), result);
    }

    [TestMethod]
    void makesNodesFromAMaybeRule(){
        String input = "act-maybe: hello";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("maybe", input, 11, 16).noElems(), result);
    }

    [TestMethod]
    void doesNotInvokeAnActionForAMaybeRuleWithNoMatch(){
        String input = "act-maybe: ";
        TreeNode result = NodeActions.parse(input, new TestActions());

        expect(result).toMatch(node("", 11).noElems());
    }

    [TestMethod]
    void makesNodesFromARepetition(){
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

    [TestMethod]
    void makesNodesFromARepetitionInParentheses(){
        String input = "act-rep-paren: abab";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(
            new CustomNode("rep-paren", input, 15, 19)
                .elem(node("ab", 15)
                    .elem(node("a", 15).noElems())
                    .elem(node("b", 16).noElems())
                )
                .elem(node("ab", 17)
                    .elem(node("a", 17).noElems())
                    .elem(node("b", 18).noElems())
                ),
            result
        );
    }

    [TestMethod]
    void makesNodesFromASequence(){
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

    [TestMethod]
    void makesNodesFromASequenceWithMutedElements(){
        String input = "act-seq-mute: xyz";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(
            new CustomNode("seq", input, 14, 17)
                .elem(node("x", 14).noElems())
                .elem(node("z", 16).noElems()),
            result
        );
    }

    [TestMethod]
    void makesNodesFromAParenthesisedExpression(){
        String input = "act-paren: !";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1);

        assertNode(new CustomNode("paren", input, 11, 12).noElems(), result);
    }

    [TestMethod]
    void bindsToTheOptionsOfAChoice(){
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

    [TestMethod]
    void treatsNullAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: null", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    [TestMethod]
    void treatsFalseAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: false", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    [TestMethod]
    void treatsZeroAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: 0", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    [TestMethod]
    void treatsEmptyStringsAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: ''", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    [TestMethod]
    void treatsEmptyListsAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: []", new TestActions()).elements.get(1);
        assertEquals(null, result);
    }

    [TestMethod]
    void treatsFalseyValuesAsAcceptableLookaheadResults(){
        String input = "act-falsey-pred: 0";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.get(1).elements.get(1);

        assertNode(new CustomNode("zero", input, 17, 18).noElems(), result);
    }

    [TestMethod]
    void treatsFalseyValuesAsAcceptableRepetitionResults(){
        String input = "act-falsey-rep: null0false''[]";
        List<TreeNode> elements = NodeActions.parse(input, new TestActions()).elements.get(1).elements;

        assertEquals(5, elements.size());
        foreach (TreeNode elem in elements) {
            assertEquals(null, elem);
        }
    }

    [TestMethod]
    void treatsFalseyValuesAsAcceptableMaybeResults(){
        String input = "act-falsey-opt: null";
        TreeNode result = NodeActions.parse(input, new TestActions()).elements.get(1);

        assertEquals(null, result);
    }

    [TestMethod]
    void treatsFalseyValuesAsAcceptableSequenceResults(){
        String input = "act-falsey-seq: (null)";
        TreeNode result = NodeActions.parse(input, new TestActions()).elements.get(1);

        assertEquals(3, result.elements.size());
        assertEquals(null, result.elements.get(1));
    }

    [TestMethod]
    void treatsFalseyValuesAsAcceptableChoiceResults(){
        String input = "act-falsey-choice: null";
        TreeNode result = NodeActions.parse(input, new TestActions()).elements.get(1);

        assertEquals(null, result);
    }
}

class TestActions : Actions {
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

    public CustomNode make_rep_paren(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("rep-paren", input, start, end, elements);
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

class CustomNode : TreeNode {
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

class NodeWrapper : Node<Label> {
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
        List<Node<Label>> ret = new List<Node<Label>>();
        foreach (var item in node.elements) {
            ret.Add(new NodeWrapper(item));
        }
        return ret;
    }

    public Node<Label> get(Label key) {
        return new NodeWrapper(node.get(key));
    }
}
