package helpers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class NodeSpec<L> {
    private String text;
    private int offset;
    private ArrayList<NodeSpec> elements = null;
    private HashMap<L, NodeSpec> labelled = new HashMap();

    public NodeSpec(String text, int offset) {
        this.text = text;
        this.offset = offset;
    }

    public NodeSpec text(String text) {
        this.text = text;
        return this;
    }

    public NodeSpec offset(int offset) {
        this.offset = offset;
        return this;
    }

    public NodeSpec noElems() {
        elements = new ArrayList<NodeSpec>();
        return this;
    }

    public NodeSpec elem(NodeSpec elem) {
        if (elements == null) {
            elements = new ArrayList<NodeSpec>();
        }
        elements.add(elem);
        return this;
    }

    public NodeSpec label(L label, NodeSpec elem) {
        labelled.put(label, elem);
        return this;
    }

    void assertMatches(Node node) {
        assertEquals(text, node.text());
        assertEquals(offset, node.offset());

        if (elements != null) {
            List<Node> actualElems = node.elements();
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
