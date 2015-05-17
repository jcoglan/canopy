package examples.canopy.lisp;

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
        labelled.put(Label.data, elements.get(1));
    }
}

class SyntaxNode2 extends SyntaxNode {
    SyntaxNode2(String text, int offset, List<SyntaxNode> elements) {
        super(text, offset, elements);
        labelled.put(Label.cells, elements.get(1));
    }
}
