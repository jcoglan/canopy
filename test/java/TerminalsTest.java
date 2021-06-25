package canopy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

import test.grammars.terminals.ParseError;
import test.grammars.terminals.Terminals;
import test.grammars.terminals.TreeNode;

class AnyCharTest extends ParseHelper {
    @Test
    void parsesAnySingleCharacter() throws ParseError {
        expectParse(Terminals.parse("any: a")).text("a").offset(5);
        expectParse(Terminals.parse("any: !")).text("!").offset(5);
    }
}

class ParseHelper {
    NodeMatcher expectParse(TreeNode node) {
        return new NodeMatcher(node.elements.get(1));
    }
}

class NodeMatcher {
    private TreeNode node;

    NodeMatcher(TreeNode node) {
        this.node = node;
    }

    NodeMatcher text(String text) {
        assertEquals(text, node.text);
        return this;
    }

    NodeMatcher offset(int offset) {
        assertEquals(offset, node.offset);
        return this;
    }
}
