package canopy.predicates;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

import helpers.Node;
import helpers.NodeSpec;

import test.grammars.predicates.Label;
import test.grammars.predicates.ParseError;
import test.grammars.predicates.Predicates;
import test.grammars.predicates.TreeNode;

class PositiveLookAheadTest extends ParseHelper {
    @Test
    void checksTheFirstCharacterOfAWord() throws ParseError {
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

    @Test
    void rejectsWordsWhereThePredicateDoesNotMatch() {
        assertThrows(ParseError.class, () -> Predicates.parse("pos-name: london"));
    }

    @Test
    void resetsTheCursorAfterMatching() throws ParseError {
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

    @Test
    void usesAReferenceAsAPredicate() throws ParseError {
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

class NegativeLookAheadTest extends ParseHelper {
    @Test
    void checksTheFirstCharacterOfAWord() throws ParseError {
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

    @Test
    void rejectsWordsWhereThePredicateMatches() {
        assertThrows(ParseError.class, () -> Predicates.parse("neg-name: Word"));
    }

    @Test
    void checksForAStringAtTheEnd() throws ParseError {
        expect(Predicates.parse("neg-tail-str: word")).toMatch(
            node("word", 14)
                .elem(node("word", 14).noElems())
                .elem(node("", 18).noElems())
        );
    }

    @Test
    void checksForAClassAtTheEnd() throws ParseError {
        expect(Predicates.parse("neg-tail-class: word")).toMatch(
            node("word", 16)
                .elem(node("word", 16).noElems())
                .elem(node("", 20).noElems())
        );
    }

    @Test
    void checksForAnyCharAtTheEnd() throws ParseError {
        expect(Predicates.parse("neg-tail-any: word")).toMatch(
            node("word", 14)
                .elem(node("word", 14).noElems())
                .elem(node("", 18).noElems())
        );
    }

    @Test
    void rejectsInputsThatMatchTheNegativePattern() {
        assertThrows(ParseError.class, () -> Predicates.parse("neg-tail-str: wordmore text"));
        assertThrows(ParseError.class, () -> Predicates.parse("neg-tail-class: words"));
        assertThrows(ParseError.class, () -> Predicates.parse("neg-tail-any: word "));
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
