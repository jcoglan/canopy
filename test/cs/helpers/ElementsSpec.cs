//package helpers;

using System.Collections.Generic;
using System.Collections;
//import static org.junit.jupiter.api.Assertions.assertEquals;

public class ElementsSpec<L> {
    private List<NodeSpec<L>> elements = null;

    public void noElems() {
        elements = new List<NodeSpec<L>>();
    }

    public void elem(NodeSpec<L> elem) {
        if (elements == null) {
            elements = new List<NodeSpec<L>>();
        }
        elements.Add(elem);
    }

    public void check(Node<L> node) {
        if (elements == null) {
            return;
        }

        List<Node<L>> actualElems = node.elements();
        assertEquals(elements.Count, actualElems.Count);

        for (int i = 0; i < elements.size(); i++) {
            elements[i].assertMatches(actualElems[i]);
        }
    }
}
