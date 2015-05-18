package examples.canopy.peg;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class TreeNode implements Iterable<TreeNode> {
    public String text;
    public int offset;
    public List<TreeNode> elements;

    Map<Label, TreeNode> labelled;

    public TreeNode(String text, int offset) {
        this(text, offset, new ArrayList<TreeNode>(0));
    }

    public TreeNode(String text, int offset, List<TreeNode> elements) {
        this.text = text;
        this.offset = offset;
        this.elements = elements;
        this.labelled = new EnumMap<Label, TreeNode>(Label.class);
    }

    public TreeNode get(Label key) {
        return labelled.get(key);
    }

    public Iterator<TreeNode> iterator() {
        return elements.iterator();
    }
}

class TreeNode1 extends TreeNode {
    TreeNode1(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.grammar_name, elements.get(1));
        labelled.put(Label.rules, elements.get(2));
    }
}

class TreeNode2 extends TreeNode {
    TreeNode2(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.grammar_rule, elements.get(1));
    }
}

class TreeNode3 extends TreeNode {
    TreeNode3(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.object_identifier, elements.get(3));
    }
}

class TreeNode4 extends TreeNode {
    TreeNode4(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
        labelled.put(Label.assignment, elements.get(1));
        labelled.put(Label.parsing_expression, elements.get(2));
    }
}

class TreeNode5 extends TreeNode {
    TreeNode5(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.parsing_expression, elements.get(2));
    }
}

class TreeNode6 extends TreeNode {
    TreeNode6(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.first_part, elements.get(0));
        labelled.put(Label.choice_part, elements.get(0));
        labelled.put(Label.rest, elements.get(1));
    }
}

class TreeNode7 extends TreeNode {
    TreeNode7(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.expression, elements.get(3));
        labelled.put(Label.choice_part, elements.get(3));
    }
}

class TreeNode8 extends TreeNode {
    TreeNode8(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.type_tag, elements.get(1));
    }
}

class TreeNode9 extends TreeNode {
    TreeNode9(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.actionable_expression, elements.get(0));
        labelled.put(Label.action_tag, elements.get(2));
    }
}

class TreeNode10 extends TreeNode {
    TreeNode10(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.actionable_expression, elements.get(2));
    }
}

class TreeNode11 extends TreeNode {
    TreeNode11(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(1));
    }
}

class TreeNode12 extends TreeNode {
    TreeNode12(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.object_identifier, elements.get(1));
    }
}

class TreeNode13 extends TreeNode {
    TreeNode13(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.first_part, elements.get(0));
        labelled.put(Label.sequence_part, elements.get(0));
        labelled.put(Label.rest, elements.get(1));
    }
}

class TreeNode14 extends TreeNode {
    TreeNode14(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.expression, elements.get(1));
        labelled.put(Label.sequence_part, elements.get(1));
    }
}

class TreeNode15 extends TreeNode {
    TreeNode15(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.expression, elements.get(1));
    }
}

class TreeNode16 extends TreeNode {
    TreeNode16(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.atom, elements.get(0));
    }
}

class TreeNode17 extends TreeNode {
    TreeNode17(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.atom, elements.get(0));
        labelled.put(Label.quantifier, elements.get(1));
    }
}

class TreeNode18 extends TreeNode {
    TreeNode18(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.predicate, elements.get(0));
        labelled.put(Label.atom, elements.get(1));
    }
}

class TreeNode19 extends TreeNode {
    TreeNode19(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
    }
}

class TreeNode20 extends TreeNode {
    TreeNode20(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
    }
}

class TreeNode21 extends TreeNode {
    TreeNode21(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
    }
}

class TreeNode22 extends TreeNode {
    TreeNode22(String text, int offset, List<TreeNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(1));
    }
}
