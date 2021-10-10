'use strict'

class Reference {
  constructor (name) {
    this.refName = name
  }

  referenceName () {
    return this.refName
  }

  compile (builder, address) {
    builder.jump_(address, this.refName)
  }
}

module.exports = Reference
