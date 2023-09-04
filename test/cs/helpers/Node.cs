using System.Collections.Generic;
using System;

public interface Node<L> {
    public String text();
    public int offset();
    public List<Node<L>> elements();
    public Node<L> get(L label);

    public void toMatch(NodeSpec<L> spec);
}
