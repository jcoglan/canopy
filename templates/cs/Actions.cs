using System.Collections.Generic;
using System;

namespace canopy.{{namespace}} {
    public interface Actions {
    {{#each actions}}
        public TreeNode {{this}}(String input, int start, int end, List<TreeNode> elements);
    {{/each}}
    }
}
