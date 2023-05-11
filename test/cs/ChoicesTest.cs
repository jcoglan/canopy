//package canopy.choices;
using System.Collections.Generic;
using System.Collections;
using System;

using Microsoft.VisualStudio.TestTools.UnitTesting;

//import helpers.Node;
//import helpers.NodeSpec;

using test.grammars.choices.Label;
using test.grammars.choices.ParseError;
using test.grammars.choices.Choices;
using test.grammars.choices.TreeNode;
[TestClass]
public class ChoiceStringsTest : ParseHelper {
    [TestMethod]
    void parsesAnyOfTheChoiceOptions(){
        expect(Choices.parse("choice-abc: a")).toMatch(node("a", 12));
        expect(Choices.parse("choice-abc: b")).toMatch(node("b", 12));
        expect(Choices.parse("choice-abc: c")).toMatch(node("c", 12));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsInputMatchingNoneOfTheOptions() {
        Choices.parse("choice-abc: d");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsSuperstringsOfTheOptions() {
        Choices.parse("choice-abc: ab");
    }

    [TestMethod]
    void parsesAChoiceAsPartOfASequence(){
        expect(Choices.parse("choice-seq: repeat")).toMatch(
            node("repeat", 12)
                .elem(node("re", 12).noElems())
                .elem(node("peat", 14).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void doesNotBacktrackIfLaterRulesFail() {
        Choices.parse("choice-seq: reppeat");
    }
}

class ChoiceRepetitionTest : ParseHelper {
    [TestMethod]
    void parsesADifferentOptionOnEachIteration(){
        expect(Choices.parse("choice-rep: abcabba")).toMatch(
            node("abcabba", 12)
                .elem(node("a", 12).noElems())
                .elem(node("b", 13).noElems())
                .elem(node("c", 14).noElems())
                .elem(node("a", 15).noElems())
                .elem(node("b", 16).noElems())
                .elem(node("b", 17).noElems())
                .elem(node("a", 18).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsIfAnyIterationDoesNotMatchTheOptions() {
        Choices.parse("choice-rep: abcadba");
    }
}

class ChoiceSequenceTest : ParseHelper {
    [TestMethod]
    void parsesOneBranchOfTheChoice(){
        expect(Choices.parse("choice-bind: ab")).toMatch(
            node("ab", 13)
                .elem(node("a", 13).noElems())
                .elem(node("b", 14).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void testBindsSequencesTighterThanChoices() {
        Choices.parse("choice-bind: abef");
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
