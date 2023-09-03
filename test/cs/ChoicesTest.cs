namespace canopy.choices {
    using System.Collections.Generic;
    using System.Collections;
    using System;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    using canopy.test.grammars.choices;

    [TestClass]
    public class ChoiceStringsTest : ParseHelper {
        [TestMethod]
        public void parsesAnyOfTheChoiceOptions(){
            expect(Choices.parse("choice-abc: a")).toMatch(node("a", 12));
            expect(Choices.parse("choice-abc: b")).toMatch(node("b", 12));
            expect(Choices.parse("choice-abc: c")).toMatch(node("c", 12));
        }
     
        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsInputMatchingNoneOfTheOptions() {
            Choices.parse("choice-abc: d");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsSuperstringsOfTheOptions() {
            Choices.parse("choice-abc: ab");
        }

        [TestMethod]
        public void parsesAChoiceAsPartOfASequence(){
            expect(Choices.parse("choice-seq: repeat")).toMatch(
                node("repeat", 12)
                    .elem(node("re", 12).noElems())
                    .elem(node("peat", 14).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void doesNotBacktrackIfLaterRulesFail() {
            Choices.parse("choice-seq: reppeat");
        } 
    }

    [TestClass]
    public class ChoiceRepetitionTest : ParseHelper {
        [TestMethod]
        public void parsesADifferentOptionOnEachIteration(){
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

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsIfAnyIterationDoesNotMatchTheOptions() {
            Choices.parse("choice-rep: abcadba");
        }
    }

    [TestClass]
    public class ChoiceSequenceTest : ParseHelper {
        [TestMethod]
        public void parsesOneBranchOfTheChoice(){
            expect(Choices.parse("choice-bind: ab")).toMatch(
                node("ab", 13)
                    .elem(node("a", 13).noElems())
                    .elem(node("b", 14).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void testBindsSequencesTighterThanChoices() {
            Choices.parse("choice-bind: abef");
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

        public void toMatch(NodeSpec<Label> spec) {
            spec.assertMatches(this);
        }
    }
    #pragma warning restore CS8602
}
