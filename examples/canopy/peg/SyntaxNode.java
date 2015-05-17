package examples.canopy.peg;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class SyntaxNode implements Iterable<SyntaxNode> {
    public String text;
    public int offset;
    public List<SyntaxNode> elements;

    Map<Label, SyntaxNode> labelled;

    public SyntaxNode(String text, int offset) {
        this(text, offset, new ArrayList<SyntaxNode>(0));
    }

    public SyntaxNode(String text, int offset, List<SyntaxNode> elements) {
        this.text = text;
        this.offset = offset;
        this.elements = elements;
        this.labelled = new EnumMap<Label, SyntaxNode>(Label.class);
    }

    public SyntaxNode get(Label key) {
        return labelled.get(key);
    }

    public Iterator<SyntaxNode> iterator() {
        return elements.iterator();
    }
}

class SyntaxNode1 extends SyntaxNode {
    SyntaxNode1(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.grammar_name, elements.get(1));
        labelled.put(Label.rules, elements.get(2));
    }
}

class SyntaxNode2 extends SyntaxNode {
    SyntaxNode2(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.grammar_rule, elements.get(1));
    }
}

class SyntaxNode3 extends SyntaxNode {
    SyntaxNode3(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.object_identifier, elements.get(3));
    }
}

class SyntaxNode4 extends SyntaxNode {
    SyntaxNode4(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
        labelled.put(Label.assignment, elements.get(1));
        labelled.put(Label.parsing_expression, elements.get(2));
    }
}

class SyntaxNode5 extends SyntaxNode {
    SyntaxNode5(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.parsing_expression, elements.get(2));
    }
}

class SyntaxNode6 extends SyntaxNode {
    SyntaxNode6(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.first_part, elements.get(0));
        labelled.put(Label.choice_part, elements.get(0));
        labelled.put(Label.rest, elements.get(1));
    }
}

class SyntaxNode7 extends SyntaxNode {
    SyntaxNode7(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.expression, elements.get(3));
        labelled.put(Label.choice_part, elements.get(3));
    }
}

class SyntaxNode8 extends SyntaxNode {
    SyntaxNode8(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.type_tag, elements.get(1));
    }
}

class SyntaxNode9 extends SyntaxNode {
    SyntaxNode9(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.actionable_expression, elements.get(0));
        labelled.put(Label.action_tag, elements.get(2));
    }
}

class SyntaxNode10 extends SyntaxNode {
    SyntaxNode10(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.actionable_expression, elements.get(2));
    }
}

class SyntaxNode11 extends SyntaxNode {
    SyntaxNode11(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(1));
    }
}

class SyntaxNode12 extends SyntaxNode {
    SyntaxNode12(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.object_identifier, elements.get(1));
    }
}

class SyntaxNode13 extends SyntaxNode {
    SyntaxNode13(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.first_part, elements.get(0));
        labelled.put(Label.sequence_part, elements.get(0));
        labelled.put(Label.rest, elements.get(1));
    }
}

class SyntaxNode14 extends SyntaxNode {
    SyntaxNode14(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.expression, elements.get(1));
        labelled.put(Label.sequence_part, elements.get(1));
    }
}

class SyntaxNode15 extends SyntaxNode {
    SyntaxNode15(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.expression, elements.get(1));
    }
}

class SyntaxNode16 extends SyntaxNode {
    SyntaxNode16(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.atom, elements.get(0));
    }
}

class SyntaxNode17 extends SyntaxNode {
    SyntaxNode17(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.atom, elements.get(0));
        labelled.put(Label.quantifier, elements.get(1));
    }
}

class SyntaxNode18 extends SyntaxNode {
    SyntaxNode18(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.predicate, elements.get(0));
        labelled.put(Label.atom, elements.get(1));
    }
}

class SyntaxNode19 extends SyntaxNode {
    SyntaxNode19(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
    }
}

class SyntaxNode20 extends SyntaxNode {
    SyntaxNode20(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
    }
}

class SyntaxNode21 extends SyntaxNode {
    SyntaxNode21(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(0));
    }
}

class SyntaxNode22 extends SyntaxNode {
    SyntaxNode22(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.identifier, elements.get(1));
    }
}
