package canopy.quantifiers;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

import helpers.Node;
import helpers.NodeSpec;

import test.grammars.quantifiers.ParseError;
import test.grammars.quantifiers.Quantifiers;
import test.grammars.quantifiers.TreeNode;

class MaybeTest extends ParseHelper {
    @Test
    void parsesAMatchingCharacter() throws ParseError {
        expect(Quantifiers.parse("maybe: 4")).toMatch(node("4", 7).noElems());
    }

    @Test
    void parsesTheEmptyString() throws ParseError {
        expect(Quantifiers.parse("maybe: ")).toMatch(node("", 7).noElems());
    }

    @Test
    void rejectsANonMatchingCharacter() {
        assertThrows(ParseError.class, () -> Quantifiers.parse("maybe: a"));
    }
}

class ZeroOrMoreTest extends ParseHelper {
    @Test
    void parsesTheEmptyString() throws ParseError {
        expect(Quantifiers.parse("rep-0: ")).toMatch(node("", 7).noElems());
    }

    @Test
    void parsesOneOccurrenceOfThePattern() throws ParseError {
        expect(Quantifiers.parse("rep-0: z")).toMatch(
            node("z", 7)
                .elem(node("z", 7).noElems())
        );
    }

    @Test
    void parsesManyOccurrencesOfTheSameInstanceOfThePattern() throws ParseError {
        expect(Quantifiers.parse("rep-0: zzzz")).toMatch(
            node("zzzz", 7)
                .elem(node("z", 7).noElems())
                .elem(node("z", 8).noElems())
                .elem(node("z", 9).noElems())
                .elem(node("z", 10).noElems())
        );
    }

    @Test
    void parsesManyOccurrencesOfDifferentInstancesOfThePattern() throws ParseError {
        expect(Quantifiers.parse("rep-0: wxyz")).toMatch(
            node("wxyz", 7)
                .elem(node("w", 7).noElems())
                .elem(node("x", 8).noElems())
                .elem(node("y", 9).noElems())
                .elem(node("z", 10).noElems())
        );
    }

    @Test
    void rejectsStringsWithANonMatchingPrefix() {
        assertThrows(ParseError.class, () -> Quantifiers.parse("rep-0: 4x"));
    }

    @Test
    void rejectsStringsWithANonMatchingSuffix() {
        assertThrows(ParseError.class, () -> Quantifiers.parse("rep-0: x4"));
    }

    @Test
    void parsesRepeatingPatternsGreedily() {
        assertThrows(ParseError.class, () -> Quantifiers.parse("greedy-0: xy"));
    }
}

class OneOrMoreTest extends ParseHelper {
    @Test
    void rejectsTheEmptyString() throws ParseError {
        assertThrows(ParseError.class, () -> Quantifiers.parse("rep-1: "));
    }

    @Test
    void parsesOneOccurrenceOfThePattern() throws ParseError {
        expect(Quantifiers.parse("rep-1: z")).toMatch(
            node("z", 7)
                .elem(node("z", 7).noElems())
        );
    }

    @Test
    void parsesManyOccurrencesOfTheSameInstanceOfThePattern() throws ParseError {
        expect(Quantifiers.parse("rep-1: zzzz")).toMatch(
            node("zzzz", 7)
                .elem(node("z", 7).noElems())
                .elem(node("z", 8).noElems())
                .elem(node("z", 9).noElems())
                .elem(node("z", 10).noElems())
        );
    }

    @Test
    void parsesManyOccurrencesOfDifferentInstancesOfThePattern() throws ParseError {
        expect(Quantifiers.parse("rep-1: wxyz")).toMatch(
            node("wxyz", 7)
                .elem(node("w", 7).noElems())
                .elem(node("x", 8).noElems())
                .elem(node("y", 9).noElems())
                .elem(node("z", 10).noElems())
        );
    }

    @Test
    void rejectsStringsWithANonMatchingPrefix() {
        assertThrows(ParseError.class, () -> Quantifiers.parse("rep-1: 4x"));
    }

    @Test
    void rejectsStringsWithANonMatchingSuffix() {
        assertThrows(ParseError.class, () -> Quantifiers.parse("rep-1: x4"));
    }

    @Test
    void parsesRepeatingPatternsGreedily() {
        assertThrows(ParseError.class, () -> Quantifiers.parse("greedy-1: xy"));
    }
}

class ParseHelper {
    Node expect(TreeNode node) {
        return new NodeWrapper(node.elements.get(1));
    }

    NodeSpec node(String text, int offset) {
        return new NodeSpec(text, offset);
    }
}

class NodeWrapper implements Node {
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

    public List<Node> elements() {
        return node.elements.stream()
            .map((elem) -> new NodeWrapper(elem))
            .collect(Collectors.toList());
    }
}
