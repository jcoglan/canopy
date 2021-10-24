import java.util.List;

public interface Actions {
{{#each actions}}
    public TreeNode {{this}}(String input, int start, int end, List<TreeNode> elements);
{{/each}}
}
