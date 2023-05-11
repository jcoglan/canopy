//package canopy.terminals;

using System.Collections.Generic;
using System.Collections;

using Microsoft.VisualStudio.TestTools.UnitTesting;

//import helpers.Node;
//import helpers.NodeSpec;

using test.grammars.terminals.Label;
using test.grammars.terminals.ParseError;
using test.grammars.terminals.Terminals;
using test.grammars.terminals.TreeNode;

[TestClass]
class AnyCharTest : ParseHelper {
    [TestMethod]
    void parsesAnySingleCharacter(){
        expect(Terminals.parse("any: a")).toMatch(node("a", 5));
        expect(Terminals.parse("any: !")).toMatch(node("!", 5));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsTheEmptyString() {
        Terminals.parse("any: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsInputWithTooManyCharacters() {
        Terminals.parse("any: ab");
    }
}
[TestClass]
class CharClassTest : ParseHelper {
    [TestMethod]
    void parsesCharactersWithinTheClass(){
        expect(Terminals.parse("pos-class: x")).toMatch(node("x", 11));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsCharactersOutsideTheClass() {
        Terminals.parse("pos-class: 0");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void matchesCharactersCaseSensitively() {
        Terminals.parse("pos-class: A");
    }

    [TestMethod]
    void parsesCharactersOutsideANegativeClass(){
        expect(Terminals.parse("neg-class: 0")).toMatch(node("0", 11));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsCharactersWithinANegativeClass() {
        Terminals.parse("neg-class: x");
    }
}
[TestClass]
class SingleQuotedStringTest : ParseHelper {
    [TestMethod]
    void parsesThatExactString(){
        expect(Terminals.parse("str-1: oat")).toMatch(node("oat", 7));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void matchesStringsCaseSensitively() {
        Terminals.parse("str-1: OAT");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsStringsWithAdditionalPrefixes() {
        Terminals.parse("str-1: boat");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsStringsWithAdditionalSuffixes() {
        Terminals.parse("str-1: oath");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsTheEmptyString() {
        Terminals.parse("str-1: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsPrefixesOfTheTargetString() {
        Terminals.parse("str-1: oa");
    }
}
[TestClass]
class DoubleQuotedStringTest : ParseHelper {
    [TestMethod]
    void parsesThatExactString(){
        expect(Terminals.parse("str-2: oat")).toMatch(node("oat", 7));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void matchesStringsCaseSensitively() {
        Terminals.parse("str-2: OAT");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsStringsWithAdditionalPrefixes() {
        Terminals.parse("str-2: boat");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsStringsWithAdditionalSuffixes() {
        Terminals.parse("str-2: oath");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsTheEmptyString() {
        Terminals.parse("str-2: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsPrefixesOfTheTargetString() {
        Terminals.parse("str-2: oa");
    }
}
[TestClass]
class CaseInsensitiveStringTest : ParseHelper {
    [TestMethod]
    void parsesThatExactString(){
        expect(Terminals.parse("str-ci: oat")).toMatch(node("oat", 8));
    }

    [TestMethod]
    void matchesStringsCaseInsensitively(){
        expect(Terminals.parse("str-ci: OAT")).toMatch(node("OAT", 8));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsStringsWithAdditionalPrefixes() {
        Terminals.parse("str-ci: boat");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsStringsWithAdditionalSuffixes() {
        Terminals.parse("str-ci: oath");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsTheEmptyString() {
        Terminals.parse("str-ci: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    void rejectsPrefixesOfTheTargetString() {
        Terminals.parse("str-ci: oa");
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

class NodeWrapper : Node<Label> {
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
        List<Node<Label>> ret = new List<Node<Label>>();
        foreach (var item in node.elements) {
            ret.Add(new NodeWrapper(item));
        }
        return ret;
    }

    public Node<Label> get(Label key) {
        return new NodeWrapper(node.get(key));
    }
}
