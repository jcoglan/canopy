package helpers;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ElementsSpec<L> {
    private ArrayList<NodeSpec<L>> elements = null;

    public void noElems() {
        elements = new ArrayList<NodeSpec<L>>();
    }

    public void elem(NodeSpec<L> elem) {
        if (elements == null) {
            elements = new ArrayList<NodeSpec<L>>();
        }
        elements.add(elem);
    }

    public void check(Node<L> node) {
        if (elements == null) {
            return;
        }

        List<Node<L>> actualElems = node.elements();
        assertEquals(elements.size(), actualElems.size());

        for (int i = 0; i < elements.size(); i++) {
            elements.get(i).assertMatches(actualElems.get(i));
        }
    }
}
