'use strict'

class Grammar {
  constructor (name, rules) {
    this._name  = name
    this._rules = rules
  }

  [Symbol.iterator] () {
    return this._rules[Symbol.iterator]()
  }

  compile (builder) {
    let [nodeLabels, actions, regexes] = this._gatherComponents()

    builder.package_(this._name, [...actions].sort(), () => {
      let nodeClassName = builder.syntaxNodeClass_()

      for (let [i, labels] of nodeLabels.entries())
        this._compileTreeNode(builder, nodeClassName, i, labels)

      builder.grammarModule_(() => {
        for (let [i, regex] of regexes.entries())
          builder.compileRegex_(regex, 'REGEX_' + (i + 1))

        for (let rule of this._rules)
          rule.compile(builder)
      })

      let root = this._rules[0].name
      builder.parserClass_(root)
    })
  }

  _gatherComponents () {
    let nodeLabels = [],
        actions    = new Set(),
        regexes    = []

    this._scan(this, (node) => {
      let labels = node.collectLabels && node.collectLabels()
      if (labels) nodeLabels.push([node, labels])

      if (node._actionName) actions.add(node._actionName)

      if (node.regex) regexes.push(node)
    })

    return [nodeLabels, actions, regexes]
  }

  _compileTreeNode (builder, nodeClassName, i, [node, labels]) {
    let className = nodeClassName + (i + 1)
    node.setNodeClassName(className)

    builder.class_(className, nodeClassName, () => {
      builder.attributes_(labels.keys())

      builder.constructor_(['text', 'offset', 'elements'], () => {
        for (let [key, offset] of labels)
          builder.attribute_(key, builder.arrayLookup_('elements', offset))
      })
    })
  }

  _scan (node, callback) {
    callback(node)

    if (node[Symbol.iterator]) {
      for (let child of node) this._scan(child, callback)
    }
  }
}

module.exports = Grammar
