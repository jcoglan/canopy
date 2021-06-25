package canopy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> { Terminals.parse("any: "); });
    }

    @Test
    void rejectsInputWithTooManyCharacters() {
        assertThrows(ParseError.class, () -> { Terminals.parse("any: ab"); });
    }
}

class CharClassTest extends ParseHelper {
    @Test
    void parsesCharactersWithinTheClass() throws ParseError {
        expectParse(Terminals.parse("pos-class: x")).text("x").offset(11);
    }

    @Test
    void rejectsCharactersOutsideTheClass() {
        assertThrows(ParseError.class, () -> { Terminals.parse("pos-class: 0"); });
    }

    @Test
    void matchesCharactersCaseSensitively() {
        assertThrows(ParseError.class, () -> { Terminals.parse("pos-class: A"); });
    }

    @Test
    void parsesCharactersOutsideANegativeClass() throws ParseError {
        expectParse(Terminals.parse("neg-class: 0")).text("0").offset(11);
    }

    @Test
    void rejectsCharactersWithinANegativeClass() {
        assertThrows(ParseError.class, () -> { Terminals.parse("neg-class: x"); });
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
