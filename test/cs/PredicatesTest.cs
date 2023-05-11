//package canopy.predicates;
using System.Collections.Generic;
using System.Collections;

using Microsoft.VisualStudio.TestTools.UnitTesting;

//import helpers.Node;
//import helpers.NodeSpec;

using test.grammars.predicates.Label;
using test.grammars.predicates.ParseError;
using test.grammars.predicates.Predicates;
using test.grammars.predicates.TreeNode;
[TestClass]
class PositiveLookAheadTest : ParseHelper {
    [TestMethod]
    void checksTheFirstCharacterOfAWord(){
        expect(Predicates.parse("pos-name: London")).toMatch(
            node("London", 10)
                .elem(node("", 10).noElems())
                .elem(node("London", 10)
                    .elem(node("L", 10).noElems())
                    .elem(node("o", 11).noElems())
                    .elem(node("n", 12).noElems())
                    .elem(node("d", 13).noElems())
                    .elem(node("o", 14).noElems())
                    .elem(node("n", 15).noElems())
                )
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsWordsWhereThePredicateDoesNotMatch() {
        Predicates.parse("pos-name: london");
    }

    [TestMethod]
    void resetsTheCursorAfterMatching(){
        expect(Predicates.parse("pos-seq: <abc123>")).toMatch(
            node("<abc123>", 9)
                .elem(node("", 9).noElems())
                .elem(node("<", 9).noElems())
                .elem(node("abc123", 10)
                    .elem(node("a", 10).noElems())
                    .elem(node("b", 11).noElems())
                    .elem(node("c", 12).noElems())
                    .elem(node("1", 13).noElems())
                    .elem(node("2", 14).noElems())
                    .elem(node("3", 15).noElems())
                )
                .elem(node(">", 16).noElems())
        );
    }

    [TestMethod]
    void usesAReferenceAsAPredicate(){
        expect(Predicates.parse("pos-ref: c99")).toMatch(
            node("c99", 9)
                .elem(node("", 9).noElems())
                .elem(node("c99", 9)
                    .elem(node("c", 9).noElems())
                    .elem(node("9", 10).noElems())
                    .elem(node("9", 11).noElems())
                )
        );
    }
}
[TestClass]
class NegativeLookAheadTest : ParseHelper {
    [TestMethod]
    void checksTheFirstCharacterOfAWord(){
        expect(Predicates.parse("neg-name: word")).toMatch(
            node("word", 10)
                .elem(node("", 10).noElems())
                .elem(node("word", 10)
                    .elem(node("w", 10).noElems())
                    .elem(node("o", 11).noElems())
                    .elem(node("r", 12).noElems())
                    .elem(node("d", 13).noElems())
                )
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsWordsWhereThePredicateMatches() {
        Predicates.parse("neg-name: Word");
    }

    [TestMethod]
    void checksForAStringAtTheEnd(){
        expect(Predicates.parse("neg-tail-str: word")).toMatch(
            node("word", 14)
                .elem(node("word", 14).noElems())
                .elem(node("", 18).noElems())
        );
    }

    [TestMethod]
    void checksForAClassAtTheEnd(){
        expect(Predicates.parse("neg-tail-class: word")).toMatch(
            node("word", 16)
                .elem(node("word", 16).noElems())
                .elem(node("", 20).noElems())
        );
    }

    [TestMethod]
    void checksForAnyCharAtTheEnd(){
        expect(Predicates.parse("neg-tail-any: word")).toMatch(
            node("word", 14)
                .elem(node("word", 14).noElems())
                .elem(node("", 18).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsInputsThatMatchTheNegativePattern1() {
        Predicates.parse("neg-tail-str: wordmore text");
    }
    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsInputsThatMatchTheNegativePattern2() {
        Predicates.parse("neg-tail-class: words");
    }
    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsInputsThatMatchTheNegativePattern3() {
        Predicates.parse("neg-tail-any: word ");
    }
}

class ParseHelper {
    Node<Label> expect(TreeNode node) {
        return new NodeWrapper(node.elements.get(1));
    }

    NodeSpec<Label> node(String text, int offset) {
        return new NodeSpec<Label>(text, offset);
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
