using System.Collections.Generic;
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

public class NodeSpec<L> {
    private String text_value;
    private int offset_value;
    private ElementsSpec<L> elements = new ElementsSpec<L>();
    private Dictionary<L, NodeSpec<L>> labelled = new Dictionary<L, NodeSpec<L>>();

    public NodeSpec(String text, int offset) {
        this.text_value = text;
        this.offset_value = offset;
    }

    public NodeSpec<L> text(String text) {
        this.text_value = text;
        return this;
    }

    public NodeSpec<L> offset(int offset) {
        this.offset_value = offset;
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
        labelled[label]= elem;
        return this;
    }

    public void assertMatches(Node<L> node) {
        Assert.AreEqual(text_value, node.text());
        Assert.AreEqual(offset_value, node.offset());

        elements.check(node);

        foreach (L key in labelled.Keys) {
            labelled[key].assertMatches(node.get(key));
        }
    }
}
