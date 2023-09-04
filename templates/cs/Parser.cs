using System.Collections.Generic;
using System.Collections;
using System;

namespace {{namespace}} {
    public class {{name}} : Grammar {
        public {{name}}(String input, Actions actions) {
            this.input = input;
            this.inputSize = input.Length;
            this.actions = actions;
            this.offset = 0;
            this.cache = new Dictionary<Label, Dictionary<int, CacheRecord>>();
            this.failure = 0;
            this.expected = new List<String[]>();
        }

        public static TreeNode parse(String input, Actions actions) {
            {{name}} parser = new {{name}}(input, actions);
            return parser.parse();
        }

        public static TreeNode parse(String input){
            return parse(input, null);
        }

        private static String formatError(String input, int offset, List<String[]> expected) {
            String[] lines = input.Split('\n');
            int lineNo = 0, position = 0;

            while (position <= offset) {
                position += lines[lineNo].Length + 1;
                lineNo += 1;
            }

            String line = lines[lineNo - 1];
            String message = "Line " + lineNo + ": expected one of:\n\n";

            foreach (String[] pair in expected) {
                message += "    - " + pair[1] + " from " + pair[0] + "\n";
            }

            String number = "" + lineNo;
            while (number.Length < 6) number = " " + number;
            message += "\n" + number + " | " + line + "\n";

            position -= line.Length + 10;

            while (position < offset) {
                message += " ";
                position += 1;
            }
            return message + "^";
        }

        private TreeNode parse(){
            TreeNode tree = _read_{{root}}();
            if (tree != FAILURE && offset == inputSize) {
                return tree;
            }
            if (expected.Count <= 0) {
                failure = offset;
                expected.Add(new String[] { {{{grammar}}}, "<EOF>" });
            }
            throw new ParseError(formatError(input, failure, expected));
        }
    }
}
