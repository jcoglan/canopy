package examples.canopy.peg;

class CacheRecord {
    SyntaxNode node;
    int tail;

    CacheRecord(SyntaxNode node, int tail) {
        this.node = node;
        this.tail = tail;
    }
}
