package canopy.choices;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

import helpers.Node;
import helpers.NodeSpec;

import test.grammars.choices.Label;
import test.grammars.choices.ParseError;
import test.grammars.choices.Choices;
import test.grammars.choices.TreeNode;

class ChoiceStringsTest extends ParseHelper {
    @Test
    void parsesAnyOfTheChoiceOptions() throws ParseError {
        expect(Choices.parse("choice-abc: a")).toMatch(node("a", 12));
        expect(Choices.parse("choice-abc: b")).toMatch(node("b", 12));
        expect(Choices.parse("choice-abc: c")).toMatch(node("c", 12));
    }

    @Test
    void rejectsInputMatchingNoneOfTheOptions() {
        assertThrows(ParseError.class, () -> Choices.parse("choice-abc: d"));
    }

    @Test
    void rejectsSuperstringsOfTheOptions() {
        assertThrows(ParseError.class, () -> Choices.parse("choice-abc: ab"));
    }

    @Test
    void parsesAChoiceAsPartOfASequence() throws ParseError {
        expect(Choices.parse("choice-seq: repeat")).toMatch(
            node("repeat", 12)
                .elem(node("re", 12).noElems())
                .elem(node("peat", 14).noElems())
        );
    }

    @Test
    void doesNotBacktrackIfLaterRulesFail() {
        assertThrows(ParseError.class, () -> Choices.parse("choice-seq: reppeat"));
    }
}

class ChoiceRepetitionTest extends ParseHelper {
    @Test
    void parsesADifferentOptionOnEachIteration() throws ParseError {
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

    @Test
    void rejectsIfAnyIterationDoesNotMatchTheOptions() {
        assertThrows(ParseError.class, () -> Choices.parse("choice-rep: abcadba"));
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
