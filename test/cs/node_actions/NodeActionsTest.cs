//package canopy.node_actions;

using System.Collections.Generic;
using System.Collections;
using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;


[TestClass]
public class NodeActionsTest : ParseHelper {
    [TestMethod]
    public void makesNodesFromAString(){
        String input = "act-str: hello";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(new CustomNode("str", input, 9, 14).noElems(), result);
    }

    [TestMethod]
    public void makesNodesFromACharClass(){
        String input = "act-class: k";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(new CustomNode("char", input, 11, 12).noElems(), result);
    }

    [TestMethod]
    public void makesNodesFromAnyChar(){
        String input = "act-any: ?";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(new CustomNode("any", input, 9, 10).noElems(), result);
    }

    [TestMethod]
    public void makesNodesFromAMaybeRule(){
        String input = "act-maybe: hello";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(new CustomNode("maybe", input, 11, 16).noElems(), result);
    }

    [TestMethod]
    public void doesNotInvokeAnActionForAMaybeRuleWithNoMatch(){
        String input = "act-maybe: ";
        TreeNode result = NodeActions.parse(input, new TestActions());

        expect(result).toMatch(node("", 11).noElems());
    }

    [TestMethod]
    public void makesNodesFromARepetition(){
        String input = "act-rep: abc";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(
            new CustomNode("rep", input, 9, 12)
                .elem(node("a", 9).noElems())
                .elem(node("b", 10).noElems())
                .elem(node("c", 11).noElems()),
            result
        );
    }

    [TestMethod]
    public void makesNodesFromARepetitionInParentheses(){
        String input = "act-rep-paren: abab";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

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
    public void makesNodesFromASequence(){
        String input = "act-seq: xyz";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(
            new CustomNode("seq", input, 9, 12)
                .elem(node("x", 9).noElems())
                .elem(node("y", 10).noElems())
                .elem(node("z", 11).noElems()),
            result
        );
    }

    [TestMethod]
    public void makesNodesFromASequenceWithMutedElements(){
        String input = "act-seq-mute: xyz";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(
            new CustomNode("seq", input, 14, 17)
                .elem(node("x", 14).noElems())
                .elem(node("z", 16).noElems()),
            result
        );
    }

    [TestMethod]
    public void makesNodesFromAParenthesisedExpression(){
        String input = "act-paren: !";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        assertNode(new CustomNode("paren", input, 11, 12).noElems(), result);
    }

    [TestMethod]
    public void bindsToTheOptionsOfAChoice(){
        String input = "act-choice: 0";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);
        assertNode(new CustomNode("zero", input, 12, 13).noElems(), result);

        input = "act-choice: 42";
        result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

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
    public void treatsNullAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: null", new TestActions()).elements.ElementAtOrDefault(1);
        Assert.AreEqual(null, result);
    }

    [TestMethod]
    public void treatsFalseAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: false", new TestActions()).elements.ElementAtOrDefault(1);
        Assert.AreEqual(null, result);
    }

    [TestMethod]
    public void treatsZeroAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: 0", new TestActions()).elements.ElementAtOrDefault(1);
        Assert.AreEqual(null, result);
    }

    [TestMethod]
    public void treatsEmptyStringsAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: ''", new TestActions()).elements.ElementAtOrDefault(1);
        Assert.AreEqual(null, result);
    }

    [TestMethod]
    public void treatsEmptyListsAsAValidResult(){
        CustomNode result = (CustomNode)NodeActions.parse("act-falsey: []", new TestActions()).elements.ElementAtOrDefault(1);
        Assert.AreEqual(null, result);
    }

    [TestMethod]
    public void treatsFalseyValuesAsAcceptableLookaheadResults(){
        String input = "act-falsey-pred: 0";
        CustomNode result = (CustomNode)NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1).elements.ElementAtOrDefault(1);

        assertNode(new CustomNode("zero", input, 17, 18).noElems(), result);
    }

    [TestMethod]
    public void treatsFalseyValuesAsAcceptableRepetitionResults(){
        String input = "act-falsey-rep: null0false''[]";
        List<TreeNode> elements = NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1).elements;

        Assert.AreEqual(5, elements.Count);
        foreach (TreeNode elem in elements) {
            Assert.AreEqual(null, elem);
        }
    }

    [TestMethod]
    public void treatsFalseyValuesAsAcceptableMaybeResults(){
        String input = "act-falsey-opt: null";
        TreeNode result = NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        Assert.AreEqual(null, result);
    }

    [TestMethod]
    public void treatsFalseyValuesAsAcceptableSequenceResults(){
        String input = "act-falsey-seq: (null)";
        TreeNode result = NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        Assert.AreEqual(3, result.elements.Count);
        Assert.AreEqual(null, result.elements.ElementAtOrDefault(1));
    }

    [TestMethod]
    public void treatsFalseyValuesAsAcceptableChoiceResults(){
        String input = "act-falsey-choice: null";
        TreeNode result = NodeActions.parse(input, new TestActions()).elements.ElementAtOrDefault(1);

        Assert.AreEqual(null, result);
    }
}

public class TestActions : Actions {
    public TreeNode make_str(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("str", input, start, end, elements);
    }

    public TreeNode make_char(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("char", input, start, end, elements);
    }

    public TreeNode make_any(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("any", input, start, end, elements);
    }

    public TreeNode make_maybe(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("maybe", input, start, end, elements);
    }

    public TreeNode make_rep(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("rep", input, start, end, elements);
    }

    public TreeNode make_seq(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("seq", input, start, end, elements);
    }

    public TreeNode make_paren(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("paren", input, start, end, elements);
    }

    public TreeNode make_rep_paren(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("rep-paren", input, start, end, elements);
    }

    public TreeNode make_zero(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("zero", input, start, end, elements);
    }

    public TreeNode make_int(String input, int start, int end, List<TreeNode> elements) {
        return new CustomNode("int", input, start, end, elements);
    }

    public TreeNode make_null(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public TreeNode make_false(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public TreeNode make_0(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public TreeNode make_empty_str(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }

    public TreeNode make_empty_list(String input, int start, int end, List<TreeNode> elements) {
        return null;
    }
}

public class CustomNode : TreeNode {
    public String type, input;
    public int start, end;
    public List<TreeNode> elements;
    public ElementsSpec<Label> elemsSpec = new ElementsSpec<Label>();

    public CustomNode(String type, String input, int start, int end) : this(type, input, start, end, null){
    }

    public CustomNode(String type, String input, int start, int end, List<TreeNode> elements) {
        this.type = type;
        this.input = input;
        this.start = start;
        this.end = end;
        this.elements = elements;
    }

    public CustomNode noElems() {
        elemsSpec.noElems();
        return this;
    }

    public CustomNode elem(NodeSpec<Label> elem) {
        elemsSpec.elem(elem);
        return this;
    }
}

public class ParseHelper {
    public Node<Label> expect(TreeNode node) {
        return new NodeWrapper(node.elements.ElementAtOrDefault(1));
    }

    public NodeSpec<Label> node(String text, int offset) {
        return new NodeSpec<Label>(text, offset);
    }

    public void assertNode(CustomNode expected, CustomNode actual) {
        Assert.AreEqual(expected.type, actual.type);
        Assert.AreEqual(expected.input, actual.input);
        Assert.AreEqual(expected.start, actual.start);
        Assert.AreEqual(expected.end, actual.end);
        expected.elemsSpec.check(new NodeWrapper(new TreeNode("", 0, actual.elements)));
    }
}

#pragma warning disable CS8602
public class NodeWrapper : Node<Label> {
    private TreeNode? node;

    public NodeWrapper(TreeNode? node) {
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
#pragma warning restore CS8602
