package canopy.sequences;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

import helpers.Node;
import helpers.NodeSpec;

import test.grammars.sequences.Label;
import test.grammars.sequences.ParseError;
import test.grammars.sequences.Sequences;
import test.grammars.sequences.TreeNode;

class SequenceStringsTest extends ParseHelper {
    @Test
    void parsesAMatchingSequence() throws ParseError {
        expect(Sequences.parse("seq-str: abc")).toMatch(
            node("abc", 9)
                .elem(node("a", 9).noElems())
                .elem(node("b", 10).noElems())
                .elem(node("c", 11).noElems())
        );
    }

    @Test
    void rejectsAMissingPrefix() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-str: bc"));
    }

    @Test
    void rejectsAnAdditionalPrefix() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-str: zabc"));
    }

    @Test
    void rejectsAMissingMiddle() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-str: ac"));
    }

    @Test
    void rejectsAnAdditionalMiddle() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-str: azbzc"));
    }

    @Test
    void rejectsAMissingSuffix() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-str: ab"));
    }

    @Test
    void rejectsAnAdditionalSuffix() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-str: abcz"));
    }
}

class SequenceMaybesTest extends ParseHelper {
    @Test
    void parsesAtTheStart() throws ParseError {
        expect(Sequences.parse("seq-maybe-1: bc")).toMatch(
            node("bc", 13)
                .elem(node("", 13).noElems())
                .elem(node("b", 13).noElems())
                .elem(node("c", 14).noElems())
        );
    }

    @Test
    void parsesInTheMiddle() throws ParseError {
        expect(Sequences.parse("seq-maybe-2: ac")).toMatch(
            node("ac", 13)
                .elem(node("a", 13).noElems())
                .elem(node("", 14).noElems())
                .elem(node("c", 14).noElems())
        );
    }

    @Test
    void parsesAtTheEnd() throws ParseError {
        expect(Sequences.parse("seq-maybe-3: ab")).toMatch(
            node("ab", 13)
                .elem(node("a", 13).noElems())
                .elem(node("b", 14).noElems())
                .elem(node("", 15).noElems())
        );
    }
}

class SequenceRepetitionTest extends ParseHelper {
    @Test
    void allowsEmptyMatches() throws ParseError {
        expect(Sequences.parse("seq-rep-1: 0")).toMatch(
            node("0", 11)
                .elem(node("", 11).noElems())
                .elem(node("0", 11).noElems())
        );
    }

    @Test
    void allowsNonEmptyMatches() throws ParseError {
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

    @Test
    void parsesRepetitionsGreedily() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-rep-2: aaa"));
    }
}

class SequenceRepeatedSubSequenceTest extends ParseHelper {
    @Test
    void parsesANestedTree() throws ParseError {
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

    @Test
    void rejectsTheInputIfTheSubSequenceDoesNotMatch() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-rep-subseq: ab1b2bc"));
    }
}

class SequenceLabellingTest extends ParseHelper {
    @Test
    void createsNamedReferencesToChildNodes() throws ParseError {
        expect(Sequences.parse("seq-label: v987")).toMatch(
            node("v987", 11)
                .elem(node("v", 11).noElems())
                .elem(node("987", 12)
                    .elem(node("9", 12).noElems())
                    .elem(node("8", 13).noElems())
                    .elem(node("7", 14).noElems())
                )
                .label(Label.num, node("987", 12)
                    .elem(node("9", 12).noElems())
                    .elem(node("8", 13).noElems())
                    .elem(node("7", 14).noElems())
                )
        );
    }

    @Test
    void createsNamedReferencesInsideRepeatedSubSequences() throws ParseError {
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
                        .label(Label.part, node("AB", 20)
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
                        .label(Label.part, node("CD", 23)
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
                        .label(Label.part, node("EF", 26)
                            .elem(node("E", 26).noElems())
                            .elem(node("F", 27).noElems())
                        )
                    )
                )
        );
    }
}

class SequenceMutingTest extends ParseHelper {
    @Test
    void removesChildNodesFromTheSequence() throws ParseError {
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

    @Test
    void removesChildSequencesFromTheSequence() throws ParseError {
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

    @Test
    void removesNodesFromChildSequences() throws ParseError {
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

    @Test
    void correctlyHandlesNestedExpressionsUsingMutes() throws ParseError {
        expect(Sequences.parse("seq-mute-4: abcde")).toMatch(
            node("abcde", 12)
                .elem(node("a", 12).noElems())
                .elem(node("e", 16).noElems())
        );
    }

    @Test
    void rejectsInputMissingMutedExpressions() {
        assertThrows(ParseError.class, () -> Sequences.parse("seq-mute-4: ae"));
        assertThrows(ParseError.class, () -> Sequences.parse("seq-mute-4: abde"));
    }
}

class SequenceReferencesTest extends ParseHelper {
    @Test
    void assignsLabelsToReferenceExpressions() throws ParseError {
        expect(Sequences.parse("seq-refs: ac")).toMatch(
            node("ac", 10)
                .elem(node("a", 10).noElems())
                .elem(node("c", 11).noElems())
                .label(Label.a, node("a", 10).noElems())
                .label(Label.b, node("c", 11).noElems())
                .label(Label.c, node("c", 11).noElems())
        );
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
