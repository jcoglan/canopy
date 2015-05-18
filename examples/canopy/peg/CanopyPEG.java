package examples.canopy.peg;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

public class CanopyPEG extends Grammar {
    public CanopyPEG(String input) {
        this.input = input;
        this.inputSize = input.length();
        this.offset = 0;
        this.cache = new EnumMap<Label, Map<Integer, CacheRecord>>(Label.class);
        this.failure = 0;
        this.expected = new ArrayList<String>();
    }

    public static TreeNode parse(String input) throws SyntaxError {
        CanopyPEG parser = new CanopyPEG(input);
        return parser.parse();
    }

    private static String formatError(String input, int offset, List<String> expected) {
        String[] lines = input.split("\n");
        int lineNo = 0, position = 0;
        while (position <= offset) {
            position += lines[lineNo].length() + 1;
            lineNo += 1;
        }
        String message = "Line " + lineNo + ": expected " + expected + "\n";
        String line = lines[lineNo - 1];
        message += line + "\n";
        position -= line.length() + 1;
        while (position < offset) {
            message += " ";
            position += 1;
        }
        return message + "^";
    }

    private TreeNode parse() throws SyntaxError {
        TreeNode tree = _read_grammar();
        if (tree != FAILURE && offset == inputSize) {
            return tree;
        }
        if (expected.isEmpty()) {
            failure = offset;
            expected.add("<EOF>");
        }
        throw new SyntaxError(formatError(input, failure, expected));
    }
}
