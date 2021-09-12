package helpers;

import java.util.HashMap;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class NodeSpec<L> {
    private String text;
    private int offset;
    private ElementsSpec<L> elements = new ElementsSpec<L>();
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
        elements.noElems();
        return this;
    }

    public NodeSpec<L> elem(NodeSpec<L> elem) {
        elements.elem(elem);
        return this;
    }

    public NodeSpec<L> label(L label, NodeSpec<L> elem) {
        labelled.put(label, elem);
        return this;
    }

    void assertMatches(Node<L> node) {
        assertEquals(text, node.text());
        assertEquals(offset, node.offset());

        elements.check(node);

        for (L key : labelled.keySet()) {
            labelled.get(key).assertMatches(node.get(key));
        }
    }
}
