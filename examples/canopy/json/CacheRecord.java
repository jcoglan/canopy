/**
 * This file was generated from examples/canopy/json.peg
 * See https://canopy.jcoglan.com/ for documentation
 */

package examples.canopy.json;

class CacheRecord {
    TreeNode node;
    int tail;

    CacheRecord(TreeNode node, int tail) {
        this.node = node;
        this.tail = tail;
    }
}
