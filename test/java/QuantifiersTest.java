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
