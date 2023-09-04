namespace canopy.quantifiers {
    using System.Collections.Generic;
    using System;

    using Microsoft.VisualStudio.TestTools.UnitTesting;

    using test.grammars.quantifiers;

    [TestClass]
    public class MaybeTest : ParseHelper {
        [TestMethod]
        public void parsesAMatchingCharacter() {
            expect(Quantifiers.parse("maybe: 4")).toMatch(node("4", 7).noElems());
        }

        [TestMethod]
        public void parsesTheEmptyString() {
            expect(Quantifiers.parse("maybe: ")).toMatch(node("", 7).noElems());
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsANonMatchingCharacter() {
            Quantifiers.parse("maybe: a");
        }
    }

    [TestClass]
    public class ZeroOrMoreTest : ParseHelper {
        [TestMethod]
        public void parsesTheEmptyString() {
            expect(Quantifiers.parse("rep-0: ")).toMatch(node("", 7).noElems());
        }

        [TestMethod]
        public void parsesOneOccurrenceOfThePattern() {
            expect(Quantifiers.parse("rep-0: z")).toMatch(
                node("z", 7)
                    .elem(node("z", 7).noElems())
            );
        }

        [TestMethod]
        public void parsesManyOccurrencesOfTheSameInstanceOfThePattern() {
            expect(Quantifiers.parse("rep-0: zzzz")).toMatch(
                node("zzzz", 7)
                    .elem(node("z", 7).noElems())
                    .elem(node("z", 8).noElems())
                    .elem(node("z", 9).noElems())
                    .elem(node("z", 10).noElems())
            );
        }

        [TestMethod]
        public void parsesManyOccurrencesOfDifferentInstancesOfThePattern() {
            expect(Quantifiers.parse("rep-0: wxyz")).toMatch(
                node("wxyz", 7)
                    .elem(node("w", 7).noElems())
                    .elem(node("x", 8).noElems())
                    .elem(node("y", 9).noElems())
                    .elem(node("z", 10).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsStringsWithANonMatchingPrefix() {
            Quantifiers.parse("rep-0: 4x");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsStringsWithANonMatchingSuffix() {
            Quantifiers.parse("rep-0: x4");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void parsesRepeatingPatternsGreedily() {
            Quantifiers.parse("greedy-0: xy");
        }
    }

    [TestClass]
    public class OneOrMoreTest : ParseHelper {
        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTheEmptyString() {
            Quantifiers.parse("rep-1: ");
        }

        [TestMethod]
        public void parsesOneOccurrenceOfThePattern() {
            expect(Quantifiers.parse("rep-1: z")).toMatch(
                node("z", 7)
                    .elem(node("z", 7).noElems())
            );
        }

        [TestMethod]
        public void parsesManyOccurrencesOfTheSameInstanceOfThePattern() {
            expect(Quantifiers.parse("rep-1: zzzz")).toMatch(
                node("zzzz", 7)
                    .elem(node("z", 7).noElems())
                    .elem(node("z", 8).noElems())
                    .elem(node("z", 9).noElems())
                    .elem(node("z", 10).noElems())
            );
        }

        [TestMethod]
        public void parsesManyOccurrencesOfDifferentInstancesOfThePattern() {
            expect(Quantifiers.parse("rep-1: wxyz")).toMatch(
                node("wxyz", 7)
                    .elem(node("w", 7).noElems())
                    .elem(node("x", 8).noElems())
                    .elem(node("y", 9).noElems())
                    .elem(node("z", 10).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsStringsWithANonMatchingPrefix() {
            Quantifiers.parse("rep-1: 4x");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsStringsWithANonMatchingSuffix() {
            Quantifiers.parse("rep-1: x4");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void parsesRepeatingPatternsGreedily() {
            Quantifiers.parse("greedy-1: xy");
        }

        [TestMethod]
        public void parsesARepeatedReference() {
            expect(Quantifiers.parse("color-ref: #abc123")).toMatch(
                node("#abc123", 11)
                    .elem(node("#", 11).noElems())
                    .elem(node("abc123", 12)
                        .elem(node("a", 12).noElems())
                        .elem(node("b", 13).noElems())
                        .elem(node("c", 14).noElems())
                        .elem(node("1", 15).noElems())
                        .elem(node("2", 16).noElems())
                        .elem(node("3", 17).noElems())
                    )
            );
        }

        [TestMethod]
        public void parsesARepeatedChoice() {
            expect(Quantifiers.parse("color-choice: #abc123")).toMatch(
                node("#abc123", 14)
                    .elem(node("#", 14).noElems())
                    .elem(node("abc123", 15)
                        .elem(node("a", 15).noElems())
                        .elem(node("b", 16).noElems())
                        .elem(node("c", 17).noElems())
                        .elem(node("1", 18).noElems())
                        .elem(node("2", 19).noElems())
                        .elem(node("3", 20).noElems())
                    )
            );
        }
    }

    [TestClass]
    public class ExactlyTest : ParseHelper {
        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTheEmptyString() {
            Quantifiers.parse("rep-exact: ");
        }

        [TestMethod]
        public void parsesTheRequiredNumberOfThePattern() {
            expect(Quantifiers.parse("rep-exact: abc")).toMatch(
                node("abc", 11)
                    .elem(node("a", 11).noElems())
                    .elem(node("b", 12).noElems())
                    .elem(node("c", 13).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTooFewCopiesOfThePattern() {
            Quantifiers.parse("rep-exact: ab");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTooManyCopiesOfThePattern() {
            Quantifiers.parse("rep-exact: abcd");
        }
    }

    [TestClass]
    public class MinimumTest : ParseHelper {
        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTheEmptyString() {
            Quantifiers.parse("rep-min: ");
        }

        [TestMethod]
        public void parsesTheRequiredNumberOfThePattern() {
            expect(Quantifiers.parse("rep-min: abc")).toMatch(
                node("abc", 9)
                    .elem(node("a", 9).noElems())
                    .elem(node("b", 10).noElems())
                    .elem(node("c", 11).noElems())
            );
        }

        [TestMethod]
        public void parsesMoreCopiesOfThePattern() {
            expect(Quantifiers.parse("rep-min: abcdef")).toMatch(
                node("abcdef", 9)
                    .elem(node("a", 9).noElems())
                    .elem(node("b", 10).noElems())
                    .elem(node("c", 11).noElems())
                    .elem(node("d", 12).noElems())
                    .elem(node("e", 13).noElems())
                    .elem(node("f", 14).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTooFewCopiesOfThePattern() {
            Quantifiers.parse("rep-min: ab");
        }
    }

    [TestClass]
    public class RangeTest : ParseHelper {
        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTheEmptyString() {
            Quantifiers.parse("rep-range: ");
        }

        [TestMethod]
        public void parsesTheMinimumNumberOfThePattern() {
            expect(Quantifiers.parse("rep-range: abc")).toMatch(
                node("abc", 11)
                    .elem(node("a", 11).noElems())
                    .elem(node("b", 12).noElems())
                    .elem(node("c", 13).noElems())
            );
        }

        [TestMethod]
        public void parsesTheMaximumNumberOfThePattern() {
            expect(Quantifiers.parse("rep-range: abcde")).toMatch(
                node("abcde", 11)
                    .elem(node("a", 11).noElems())
                    .elem(node("b", 12).noElems())
                    .elem(node("c", 13).noElems())
                    .elem(node("d", 14).noElems())
                    .elem(node("e", 15).noElems())
            );
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTooFewCopiesOfThePattern() {
            Quantifiers.parse("rep-range: ab");
        }

        [TestMethod]
        [ExpectedException(typeof(ParseError))]
        public void rejectsTooManyCopiesOfThePattern() {
            Quantifiers.parse("rep-range: abcdef");
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

    public class NodeWrapper : Node<Label> {
        private TreeNode node;

        public NodeWrapper(TreeNode node) {
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
}
