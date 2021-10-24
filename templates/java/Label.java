public enum Label {
{{#each labels}}
    {{this}}{{#unless @last}},{{/unless}}
{{/each}}
}
