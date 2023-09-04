namespace canopy.predicates {
    using System.Collections.Generic;
    using System;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    using canopy.test.grammars.predicates;

    [TestClass]
    public class PositiveLookAheadTest : ParseHelper {
        [TestMethod]
        public void checksTheFirstCharacterOfAWord() {
            expect(Predicates.parse("pos-name: London")).toMatch(
                node("London", 10)
                    .elem(node("", 10).noElems())
                    .elem(node("London", 10)
                        .elem(node("L", 10).noElems())
                        .elem(node("o", 11).noElems())
                        .elem(node("n", 12).noElems())
                        .elem(node("d", 13).noElems())
                        .elem(node("o", 14).noElems())
                        .elem(node("n", 15).noElems())
                    )
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsWordsWhereThePredicateDoesNotMatch() {
            Predicates.parse("pos-name: london");
        }

        [TestMethod]
        public void resetsTheCursorAfterMatching() {
            expect(Predicates.parse("pos-seq: <abc123>")).toMatch(
                node("<abc123>", 9)
                    .elem(node("", 9).noElems())
                    .elem(node("<", 9).noElems())
                    .elem(node("abc123", 10)
                        .elem(node("a", 10).noElems())
                        .elem(node("b", 11).noElems())
                        .elem(node("c", 12).noElems())
                        .elem(node("1", 13).noElems())
                        .elem(node("2", 14).noElems())
                        .elem(node("3", 15).noElems())
                    )
                    .elem(node(">", 16).noElems())
            );
        }

        [TestMethod]
        public void usesAReferenceAsAPredicate() {
            expect(Predicates.parse("pos-ref: c99")).toMatch(
                node("c99", 9)
                    .elem(node("", 9).noElems())
                    .elem(node("c99", 9)
                        .elem(node("c", 9).noElems())
                        .elem(node("9", 10).noElems())
                        .elem(node("9", 11).noElems())
                    )
            );
        }
    }

    [TestClass]
    public class NegativeLookAheadTest : ParseHelper {
        [TestMethod]
        public void checksTheFirstCharacterOfAWord() {
            expect(Predicates.parse("neg-name: word")).toMatch(
                node("word", 10)
                    .elem(node("", 10).noElems())
                    .elem(node("word", 10)
                        .elem(node("w", 10).noElems())
                        .elem(node("o", 11).noElems())
                        .elem(node("r", 12).noElems())
                        .elem(node("d", 13).noElems())
                    )
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsWordsWhereThePredicateMatches() {
            Predicates.parse("neg-name: Word");
        }

        [TestMethod]
        public void checksForAStringAtTheEnd() {
            expect(Predicates.parse("neg-tail-str: word")).toMatch(
                node("word", 14)
                    .elem(node("word", 14).noElems())
                    .elem(node("", 18).noElems())
            );
        }

        [TestMethod]
        public void checksForAClassAtTheEnd() {
            expect(Predicates.parse("neg-tail-class: word")).toMatch(
                node("word", 16)
                    .elem(node("word", 16).noElems())
                    .elem(node("", 20).noElems())
            );
        }

        [TestMethod]
        public void checksForAnyCharAtTheEnd() {
            expect(Predicates.parse("neg-tail-any: word")).toMatch(
                node("word", 14)
                    .elem(node("word", 14).noElems())
                    .elem(node("", 18).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsInputsThatMatchTheNegativePattern1() {
            Predicates.parse("neg-tail-str: wordmore text");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsInputsThatMatchTheNegativePattern2() {
            Predicates.parse("neg-tail-class: words");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsInputsThatMatchTheNegativePattern3() {
            Predicates.parse("neg-tail-any: word ");
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
