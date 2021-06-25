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

class SingleQuotedStringTest extends ParseHelper {
    @Test
    void parsesThatExactString() throws ParseError {
        expectParse(Terminals.parse("str-1: oat")).text("oat").offset(7);
    }

    @Test
    void matchesStringsCaseSensitively() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-1: OAT"); });
    }

    @Test
    void rejectsStringsWithAdditionalPrefixes() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-1: boat"); });
    }

    @Test
    void rejectsStringsWithAdditionalSuffixes() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-1: oath"); });
    }

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-1: "); });
    }

    @Test
    void rejectsPrefixesOfTheTargetString() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-1: oa"); });
    }
}

class DoubleQuotedStringTest extends ParseHelper {
    @Test
    void parsesThatExactString() throws ParseError {
        expectParse(Terminals.parse("str-2: oat")).text("oat").offset(7);
    }

    @Test
    void matchesStringsCaseSensitively() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-2: OAT"); });
    }

    @Test
    void rejectsStringsWithAdditionalPrefixes() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-2: boat"); });
    }

    @Test
    void rejectsStringsWithAdditionalSuffixes() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-2: oath"); });
    }

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-2: "); });
    }

    @Test
    void rejectsPrefixesOfTheTargetString() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-2: oa"); });
    }
}

class CaseInsensitiveStringTest extends ParseHelper {
    @Test
    void parsesThatExactString() throws ParseError {
        expectParse(Terminals.parse("str-ci: oat")).text("oat").offset(8);
    }

    @Test
    void matchesStringsCaseInsensitively() throws ParseError {
        expectParse(Terminals.parse("str-ci: OAT")).text("OAT").offset(8);
    }

    @Test
    void rejectsStringsWithAdditionalPrefixes() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-ci: boat"); });
    }

    @Test
    void rejectsStringsWithAdditionalSuffixes() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-ci: oath"); });
    }

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-ci: "); });
    }

    @Test
    void rejectsPrefixesOfTheTargetString() {
        assertThrows(ParseError.class, () -> { Terminals.parse("str-ci: oa"); });
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
