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

    builder.package_(this._name, (builder) => {
      let nodeClassName = builder.syntaxNodeClass_()

      for (let [i, labels] of nodeLabels.entries())
        this._compileTreeNode(builder, nodeClassName, i, labels)

      builder.grammarModule_(actions.sort(), (builder) => {
        for (let [i, regex] of regexes.entries())
          builder.compileRegex_(regex, 'REGEX_' + (i + 1))

        for (let rule of this._rules)
          rule.compile(builder)
      })

      let root = this._rules[0].name

      builder.parserClass_(root)
      builder.exports_()
    })
  }

  _gatherComponents () {
    let nodeLabels = [],
        actions    = [],
        regexes    = []

    this._scan(this, (node) => {
      let labels = node.collectLabels && node.collectLabels()
      if (labels) nodeLabels.push([node, labels])

      if (node._actionName && actions.indexOf(node._actionName) < 0)
        actions.push(node._actionName)

      if (node.regex) regexes.push(node)
    })

    return [nodeLabels, actions, regexes]
  }

  _compileTreeNode (builder, nodeClassName, i, [node, labels]) {
    let className = nodeClassName + (i + 1)
    node.setNodeClassName(className)

    builder.class_(className, nodeClassName, (builder) => {
      builder.attributes_(Object.keys(labels))

      builder.constructor_(['text', 'offset', 'elements'], (builder) => {
        for (let key in labels)
          builder.attribute_(key, builder.arrayLookup_('elements', labels[key]))
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
