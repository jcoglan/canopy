package helpers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class NodeSpec<L> {
    private String text;
    private int offset;
    private ArrayList<NodeSpec<L>> elements = null;
    private HashMap<L, NodeSpec<L>> labelled = new HashMap<L, NodeSpec<L>>();

    public NodeSpec(String text, int offset) {
        this.text = text;
        this.offset = offset;
    }

    public NodeSpec<L> text(String text) {
        this.text = text;
        return this;
    }

    public NodeSpec<L> offset(int offset) {
        this.offset = offset;
        return this;
    }

    public NodeSpec<L> noElems() {
        elements = new ArrayList<NodeSpec<L>>();
        return this;
    }

    public NodeSpec<L> elem(NodeSpec<L> elem) {
        if (elements == null) {
            elements = new ArrayList<NodeSpec<L>>();
        }
        elements.add(elem);
        return this;
    }

    public NodeSpec<L> label(L label, NodeSpec<L> elem) {
        labelled.put(label, elem);
        return this;
    }

    void assertMatches(Node<L> node) {
        assertEquals(text, node.text());
        assertEquals(offset, node.offset());

        if (elements != null) {
            List<Node<L>> actualElems = node.elements();
            assertEquals(elements.size(), actualElems.size());

            for (int i = 0; i < elements.size(); i++) {
                elements.get(i).assertMatches(actualElems.get(i));
            }
        }

        for (L key : labelled.keySet()) {
            labelled.get(key).assertMatches(node.get(key));
        }
    }
}
