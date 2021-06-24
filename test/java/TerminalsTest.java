import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

import test.grammars.terminals.ParseError;
import test.grammars.terminals.Terminals;
import test.grammars.terminals.TreeNode;

class AnyCharTest {
    TreeNode node;

    @Test
    void parsesAnySingleCharacter() throws ParseError {
        node = Terminals.parse("any: a").elements.get(1);
        assertEquals("a", node.text);
        assertEquals(5, node.offset);

        node = Terminals.parse("any: !").elements.get(1);
        assertEquals("!", node.text);
        assertEquals(5, node.offset);
    }
}
