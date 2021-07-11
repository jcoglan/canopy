package canopy.terminals;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;

import helpers.Node;
import helpers.NodeSpec;

import test.grammars.terminals.Label;
import test.grammars.terminals.ParseError;
import test.grammars.terminals.Terminals;
import test.grammars.terminals.TreeNode;

class AnyCharTest extends ParseHelper {
    @Test
    void parsesAnySingleCharacter() throws ParseError {
        expect(Terminals.parse("any: a")).toMatch(node("a", 5));
        expect(Terminals.parse("any: !")).toMatch(node("!", 5));
    }

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> Terminals.parse("any: "));
    }

    @Test
    void rejectsInputWithTooManyCharacters() {
        assertThrows(ParseError.class, () -> Terminals.parse("any: ab"));
    }
}

class CharClassTest extends ParseHelper {
    @Test
    void parsesCharactersWithinTheClass() throws ParseError {
        expect(Terminals.parse("pos-class: x")).toMatch(node("x", 11));
    }

    @Test
    void rejectsCharactersOutsideTheClass() {
        assertThrows(ParseError.class, () -> Terminals.parse("pos-class: 0"));
    }

    @Test
    void matchesCharactersCaseSensitively() {
        assertThrows(ParseError.class, () -> Terminals.parse("pos-class: A"));
    }

    @Test
    void parsesCharactersOutsideANegativeClass() throws ParseError {
        expect(Terminals.parse("neg-class: 0")).toMatch(node("0", 11));
    }

    @Test
    void rejectsCharactersWithinANegativeClass() {
        assertThrows(ParseError.class, () -> Terminals.parse("neg-class: x"));
    }
}

class SingleQuotedStringTest extends ParseHelper {
    @Test
    void parsesThatExactString() throws ParseError {
        expect(Terminals.parse("str-1: oat")).toMatch(node("oat", 7));
    }

    @Test
    void matchesStringsCaseSensitively() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-1: OAT"));
    }

    @Test
    void rejectsStringsWithAdditionalPrefixes() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-1: boat"));
    }

    @Test
    void rejectsStringsWithAdditionalSuffixes() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-1: oath"));
    }

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-1: "));
    }

    @Test
    void rejectsPrefixesOfTheTargetString() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-1: oa"));
    }
}

class DoubleQuotedStringTest extends ParseHelper {
    @Test
    void parsesThatExactString() throws ParseError {
        expect(Terminals.parse("str-2: oat")).toMatch(node("oat", 7));
    }

    @Test
    void matchesStringsCaseSensitively() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-2: OAT"));
    }

    @Test
    void rejectsStringsWithAdditionalPrefixes() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-2: boat"));
    }

    @Test
    void rejectsStringsWithAdditionalSuffixes() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-2: oath"));
    }

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-2: "));
    }

    @Test
    void rejectsPrefixesOfTheTargetString() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-2: oa"));
    }
}

class CaseInsensitiveStringTest extends ParseHelper {
    @Test
    void parsesThatExactString() throws ParseError {
        expect(Terminals.parse("str-ci: oat")).toMatch(node("oat", 8));
    }

    @Test
    void matchesStringsCaseInsensitively() throws ParseError {
        expect(Terminals.parse("str-ci: OAT")).toMatch(node("OAT", 8));
    }

    @Test
    void rejectsStringsWithAdditionalPrefixes() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-ci: boat"));
    }

    @Test
    void rejectsStringsWithAdditionalSuffixes() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-ci: oath"));
    }

    @Test
    void rejectsTheEmptyString() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-ci: "));
    }

    @Test
    void rejectsPrefixesOfTheTargetString() {
        assertThrows(ParseError.class, () -> Terminals.parse("str-ci: oa"));
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
