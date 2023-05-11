using System.Collections.Generic;

public interface Actions {
{{#each actions}}
    public TreeNode {{this}}(String input, int start, int end, List<TreeNode> elements);
{{/each}}
}
