using System.Collections.Generic;
using System.Collections;
using System;

using Microsoft.VisualStudio.TestTools.UnitTesting;

using canopy.test.grammars.sequences;
#pragma warning disable CS8600
#pragma warning disable CS8604
[TestClass]
public class SequenceStringsTest : ParseHelper {
    [TestMethod]
    public void parsesAMatchingSequence(){
        expect(Sequences.parse("seq-str: abc")).toMatch(
            node("abc", 9)
                .elem(node("a", 9).noElems())
                .elem(node("b", 10).noElems())
                .elem(node("c", 11).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsAMissingPrefix() {
        Sequences.parse("seq-str: bc");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsAnAdditionalPrefix() {
        Sequences.parse("seq-str: zabc");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsAMissingMiddle() {
        Sequences.parse("seq-str: ac");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsAnAdditionalMiddle() {
        Sequences.parse("seq-str: azbzc");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsAMissingSuffix() {
        Sequences.parse("seq-str: ab");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsAnAdditionalSuffix() {
        Sequences.parse("seq-str: abcz");
    }
}
[TestClass]
public class  SequenceMaybesTest : ParseHelper {
    [TestMethod]
    public void parsesAtTheStart(){
        expect(Sequences.parse("seq-maybe-1: bc")).toMatch(
            node("bc", 13)
                .elem(node("", 13).noElems())
                .elem(node("b", 13).noElems())
                .elem(node("c", 14).noElems())
        );
    }

    [TestMethod]
    public void parsesInTheMiddle(){
        expect(Sequences.parse("seq-maybe-2: ac")).toMatch(
            node("ac", 13)
                .elem(node("a", 13).noElems())
                .elem(node("", 14).noElems())
                .elem(node("c", 14).noElems())
        );
    }

    [TestMethod]
    public void parsesAtTheEnd(){
        expect(Sequences.parse("seq-maybe-3: ab")).toMatch(
            node("ab", 13)
                .elem(node("a", 13).noElems())
                .elem(node("b", 14).noElems())
                .elem(node("", 15).noElems())
        );
    }
}
[TestClass]
public class  SequenceRepetitionTest : ParseHelper {
    [TestMethod]
    public void allowsEmptyMatches(){
        expect(Sequences.parse("seq-rep-1: 0")).toMatch(
            node("0", 11)
                .elem(node("", 11).noElems())
                .elem(node("0", 11).noElems())
        );
    }

    [TestMethod]
    public void allowsNonEmptyMatches(){
        expect(Sequences.parse("seq-rep-1: abc0")).toMatch(
            node("abc0", 11)
                .elem(node("abc", 11)
                    .elem(node("a", 11).noElems())
                    .elem(node("b", 12).noElems())
                    .elem(node("c", 13).noElems())
                )
                .elem(node("0", 14).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void parsesRepetitionsGreedily() {
        Sequences.parse("seq-rep-2: aaa");
    }
}
[TestClass]
public class  SequenceRepeatedSubSequenceTest : ParseHelper {
    [TestMethod]
    public void parsesANestedTree(){
        expect(Sequences.parse("seq-rep-subseq: ab1b2b3c")).toMatch(
            node("ab1b2b3c", 16)
                .elem(node("a", 16).noElems())
                .elem(node("b1b2b3", 17)
                    .elem(node("b1", 17)
                        .elem(node("b", 17).noElems())
                        .elem(node("1", 18).noElems())
                    )
                    .elem(node("b2", 19)
                        .elem(node("b", 19).noElems())
                        .elem(node("2", 20).noElems())
                    )
                    .elem(node("b3", 21)
                        .elem(node("b", 21).noElems())
                        .elem(node("3", 22).noElems())
                    )
                )
                .elem(node("c", 23).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsTheInputIfTheSubSequenceDoesNotMatch() {
        Sequences.parse("seq-rep-subseq: ab1b2bc");
    }
}
[TestClass]
public class  SequenceLabellingTest : ParseHelper {
    [TestMethod]
    public void createsNamedReferencesToChildNodes(){
        expect(Sequences.parse("seq-label: v987")).toMatch(
            node("v987", 11)
                .elem(node("v", 11).noElems())
                .elem(node("987", 12)
                    .elem(node("9", 12).noElems())
                    .elem(node("8", 13).noElems())
                    .elem(node("7", 14).noElems())
                )
                .label(Label.peg_num, node("987", 12)
                    .elem(node("9", 12).noElems())
                    .elem(node("8", 13).noElems())
                    .elem(node("7", 14).noElems())
                )
        );
    }

    [TestMethod]
    public void createsNamedReferencesInsideRepeatedSubSequences(){
        expect(Sequences.parse("seq-label-subseq: v.AB.CD.EF")).toMatch(
            node("v.AB.CD.EF", 18)
                .elem(node("v", 18).noElems())
                .elem(node(".AB.CD.EF", 19)
                    .elem(node(".AB", 19)
                        .elem(node(".", 19))
                        .elem(node("AB", 20)
                            .elem(node("A", 20).noElems())
                            .elem(node("B", 21).noElems())
                        )
                        .label(Label.peg_part, node("AB", 20)
                            .elem(node("A", 20).noElems())
                            .elem(node("B", 21).noElems())
                        )
                    )
                    .elem(node(".CD", 22)
                        .elem(node(".", 22))
                        .elem(node("CD", 23)
                            .elem(node("C", 23).noElems())
                            .elem(node("D", 24).noElems())
                        )
                        .label(Label.peg_part, node("CD", 23)
                            .elem(node("C", 23).noElems())
                            .elem(node("D", 24).noElems())
                        )
                    )
                    .elem(node(".EF", 25)
                        .elem(node(".", 25))
                        .elem(node("EF", 26)
                            .elem(node("E", 26).noElems())
                            .elem(node("F", 27).noElems())
                        )
                        .label(Label.peg_part, node("EF", 26)
                            .elem(node("E", 26).noElems())
                            .elem(node("F", 27).noElems())
                        )
                    )
                )
        );
    }
}
[TestClass]
public class  SequenceMutingTest : ParseHelper {
    [TestMethod]
    public void removesChildNodesFromTheSequence(){
        expect(Sequences.parse("seq-mute-1: key: 42")).toMatch(
            node("key: 42", 12)
                .elem(node("key", 12)
                    .elem(node("k", 12).noElems())
                    .elem(node("e", 13).noElems())
                    .elem(node("y", 14).noElems())
                )
                .elem(node("42", 17)
                    .elem(node("4", 17).noElems())
                    .elem(node("2", 18).noElems())
                )
        );
    }

    [TestMethod]
    public void removesChildSequencesFromTheSequence(){
        expect(Sequences.parse("seq-mute-2: key: 42")).toMatch(
            node("key: 42", 12)
                .elem(node("key", 12)
                    .elem(node("k", 12).noElems())
                    .elem(node("e", 13).noElems())
                    .elem(node("y", 14).noElems())
                )
                .elem(node("42", 17)
                    .elem(node("4", 17).noElems())
                    .elem(node("2", 18).noElems())
                )
        );
    }

    [TestMethod]
    public void removesNodesFromChildSequences(){
        expect(Sequences.parse("seq-mute-3: v.AB.CD.EF")).toMatch(
            node("v.AB.CD.EF", 12)
                .elem(node("v", 12).noElems())
                .elem(node(".AB.CD.EF", 13)
                    .elem(node(".AB", 13)
                        .elem(node("AB", 14)
                            .elem(node("A", 14).noElems())
                            .elem(node("B", 15).noElems())
                        )
                    )
                    .elem(node(".CD", 16)
                        .elem(node("CD", 17)
                            .elem(node("C", 17).noElems())
                            .elem(node("D", 18).noElems())
                        )
                    )
                    .elem(node(".EF", 19)
                        .elem(node("EF", 20)
                            .elem(node("E", 20).noElems())
                            .elem(node("F", 21).noElems())
                        )
                    )
                )
        );
    }

    [TestMethod]
    public void correctlyHandlesNestedExpressionsUsingMutes(){
        expect(Sequences.parse("seq-mute-4: abcde")).toMatch(
            node("abcde", 12)
                .elem(node("a", 12).noElems())
                .elem(node("e", 16).noElems())
        );
    }

    [TestMethod]
    public void allowsTheFirstElementToBeMuted(){
        expect(Sequences.parse("seq-mute-first: abc")).toMatch(
            node("abc", 16)
                .elem(node("b", 17).noElems())
                .elem(node("c", 18).noElems())
        );
    }

    [TestMethod]
    public void allowsTheLastElementToBeMuted(){
        expect(Sequences.parse("seq-mute-last: abc")).toMatch(
            node("abc", 15)
                .elem(node("a", 15).noElems())
                .elem(node("b", 16).noElems())
        );
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsInputMissingMutedExpressions1() {
        Sequences.parse("seq-mute-4: ae");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsInputMissingMutedExpressions2() {
        Sequences.parse("seq-mute-4: abde");
    }
}
[TestClass]
public class  SequenceReferencesTest : ParseHelper {
    [TestMethod]
    public void assignsLabelsToReferenceExpressions(){
        expect(Sequences.parse("seq-refs: ac")).toMatch(
            node("ac", 10)
                .elem(node("a", 10).noElems())
                .elem(node("c", 11).noElems())
                .label(Label.peg_a, node("a", 10).noElems())
                .label(Label.peg_b, node("c", 11).noElems())
                .label(Label.peg_c, node("c", 11).noElems())
        );
    }

    [TestMethod]
    public void mutesReferencesFromGeneratingLabels(){
        TreeNode tree = Sequences.parse("seq-mute-refs: ac");

        expect(tree).toMatch(
            node("ac", 15)
                .elem(node("a", 15).noElems())
                .label(Label.peg_a, node("a", 15).noElems())
        );

        Assert.IsNull(tree.get(Label.peg_c));
    }
}

public class  ParseHelper {
    public Node<Label> expect(TreeNode node) {
        return new NodeWrapper(node.elements[1]);
    }

    public NodeSpec<Label> node(String text, int offset) {
        return new NodeSpec<Label>(text, offset);
    }
}

public class  NodeWrapper : Node<Label> {
    private TreeNode node;

    public NodeWrapper(TreeNode node) {
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

    public void toMatch(NodeSpec<Label> spec) {
        spec.assertMatches(this);
    }
}
#pragma warning restore CS8600
#pragma warning restore CS8604
