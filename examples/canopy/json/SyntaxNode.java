package examples.canopy.json;

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
        labelled.put(Label.__, elements.get(2));
    }
}

class SyntaxNode2 extends SyntaxNode {
    SyntaxNode2(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.pair, elements.get(1));
    }
}

class SyntaxNode3 extends SyntaxNode {
    SyntaxNode3(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.pair, elements.get(1));
    }
}

class SyntaxNode4 extends SyntaxNode {
    SyntaxNode4(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.__, elements.get(1));
    }
}

class SyntaxNode5 extends SyntaxNode {
    SyntaxNode5(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.__, elements.get(2));
        labelled.put(Label.string, elements.get(1));
        labelled.put(Label.value, elements.get(4));
    }
}

class SyntaxNode6 extends SyntaxNode {
    SyntaxNode6(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.value, elements.get(1));
    }
}

class SyntaxNode7 extends SyntaxNode {
    SyntaxNode7(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.value, elements.get(1));
    }
}

class SyntaxNode8 extends SyntaxNode {
    SyntaxNode8(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.__, elements.get(1));
    }
}

class SyntaxNode9 extends SyntaxNode {
    SyntaxNode9(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.__, elements.get(2));
    }
}
