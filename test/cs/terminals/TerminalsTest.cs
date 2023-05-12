//package canopy.terminals;

using System.Collections.Generic;
using System.Collections;
using System;

using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class AnyCharTest : ParseHelper {
    [TestMethod]
    public void parsesAnySingleCharacter(){
        expect(Terminals.parse("any: a")).toMatch(node("a", 5));
        expect(Terminals.parse("any: !")).toMatch(node("!", 5));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsTheEmptyString() {
        Terminals.parse("any: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsInputWithTooManyCharacters() {
        Terminals.parse("any: ab");
    }
}
[TestClass]
public class CharClassTest : ParseHelper {
    [TestMethod]
    public void parsesCharactersWithinTheClass(){
        expect(Terminals.parse("pos-class: x")).toMatch(node("x", 11));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsCharactersOutsideTheClass() {
        Terminals.parse("pos-class: 0");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void matchesCharactersCaseSensitively() {
        Terminals.parse("pos-class: A");
    }

    [TestMethod]
    public void parsesCharactersOutsideANegativeClass(){
        expect(Terminals.parse("neg-class: 0")).toMatch(node("0", 11));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsCharactersWithinANegativeClass() {
        Terminals.parse("neg-class: x");
    }
}
[TestClass]
public class SingleQuotedStringTest : ParseHelper {
    [TestMethod]
    public void parsesThatExactString(){
        expect(Terminals.parse("str-1: oat")).toMatch(node("oat", 7));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void matchesStringsCaseSensitively() {
        Terminals.parse("str-1: OAT");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsStringsWithAdditionalPrefixes() {
        Terminals.parse("str-1: boat");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsStringsWithAdditionalSuffixes() {
        Terminals.parse("str-1: oath");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsTheEmptyString() {
        Terminals.parse("str-1: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsPrefixesOfTheTargetString() {
        Terminals.parse("str-1: oa");
    }
}
[TestClass]
public class DoubleQuotedStringTest : ParseHelper {
    [TestMethod]
    public void parsesThatExactString(){
        expect(Terminals.parse("str-2: oat")).toMatch(node("oat", 7));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void matchesStringsCaseSensitively() {
        Terminals.parse("str-2: OAT");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsStringsWithAdditionalPrefixes() {
        Terminals.parse("str-2: boat");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsStringsWithAdditionalSuffixes() {
        Terminals.parse("str-2: oath");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsTheEmptyString() {
        Terminals.parse("str-2: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsPrefixesOfTheTargetString() {
        Terminals.parse("str-2: oa");
    }
}
[TestClass]
public class CaseInsensitiveStringTest : ParseHelper {
    [TestMethod]
    public void parsesThatExactString(){
        expect(Terminals.parse("str-ci: oat")).toMatch(node("oat", 8));
    }

    [TestMethod]
    public void matchesStringsCaseInsensitively(){
        expect(Terminals.parse("str-ci: OAT")).toMatch(node("OAT", 8));
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsStringsWithAdditionalPrefixes() {
        Terminals.parse("str-ci: boat");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsStringsWithAdditionalSuffixes() {
        Terminals.parse("str-ci: oath");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsTheEmptyString() {
        Terminals.parse("str-ci: ");
    }

    [TestMethod]
    [ExpectedException(typeof(ParseError),
    "Expected a ParseError")]
    public void rejectsPrefixesOfTheTargetString() {
        Terminals.parse("str-ci: oa");
    }
}

public class ParseHelper {
    public Node<Label> expect(TreeNode node) {
        return new NodeWrapper(node.elements[1]);
    }

    public NodeSpec<Label> node(String text, int offset) {
        return new NodeSpec<Label>(text, offset);
    }
}
#pragma warning disable CS8602
public class NodeWrapper : Node<Label> {
    private TreeNode? node;

    public NodeWrapper(TreeNode? node) {
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
#pragma warning restore CS8602
