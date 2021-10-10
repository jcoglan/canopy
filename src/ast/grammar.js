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
    function scan (node, callback) {
      callback(node)
      if (node[Symbol.iterator]) {
        for (var child of node) scan(child, callback)
      }
    }

    builder.package_(this._name, (builder) => {
      var actions = []
      scan(this, (node) => {
        if (node._actionName && actions.indexOf(node._actionName) < 0) {
          actions.push(node._actionName)
        }
      })

      var nodeClassName = builder.syntaxNodeClass_(), subclassIndex = 1
      scan(this, (node) => {
        var subclassName = nodeClassName + subclassIndex,
            labels = node.collectLabels && node.collectLabels(subclassName)

        if (!labels) return

        builder.class_(subclassName, nodeClassName, (builder) => {
          var keys = []
          for (var key in labels) keys.push(key)
          builder.attributes_(keys)
          builder.constructor_(['text', 'offset', 'elements'], (builder) => {
            for (var key in labels)
              builder.attribute_(key, builder.arrayLookup_('elements', labels[key]))
          })
        })
        subclassIndex += 1
      })

      builder.grammarModule_(actions.sort(), (builder) => {
        var regexName = 'REGEX_', regexIndex = 1
        scan(this, (node) => {
          if (node.regex) builder.compileRegex_(node, regexName + (regexIndex++))
        })

        for (var rule of this._rules)
          rule.compile(builder)
      }, this)

      var root = this._rules[0].name

      builder.parserClass_(root)
      builder.exports_()
    }, this)
  }
}

module.exports = Grammar
