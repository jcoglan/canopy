/**
 * This file was generated from examples/canopy/peg.peg
 * See http://canopy.jcoglan.com/ for documentation.
 */

package examples.canopy.peg;

class CacheRecord {
    TreeNode node;
    int tail;

    CacheRecord(TreeNode node, int tail) {
        this.node = node;
        this.tail = tail;
    }
}
