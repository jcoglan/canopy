'use strict'

const { basename, dirname, join } = require('path')

const PEG_EXT = '.peg'

class Base {
  static create (filename) {
    let builder = new this()
    builder.filename = filename
    return builder
  }

  constructor (parent, name) {
    if (parent) {
      this._parent = parent
      this._indentLevel = parent._indentLevel
    } else {
      this._buffer = ''
      this._indentLevel = 0
    }
    this._name = name
    this._buffers = {}
    this._currentBuffer = null
    this._methodSeparator = ''
    this._varIndex = {}
  }

  tab_ () {
    return '  '
  }

  serialize () {
    return this._buffers
  }

  _newBuffer (ext, name = null) {
    let dir  = dirname(this.filename),
        base = basename(this.filename, PEG_EXT)

    if (name) {
      this._currentBuffer = join(dir, base, name + '.' + ext)
    } else {
      this._currentBuffer = join(dir, base + '.' + ext)
    }
    this._buffers[this._currentBuffer] = this.initBuffer_(this._currentBuffer)
  }

  initBuffer_ (pathname) {
    return ''
  }

  _write (string) {
    if (this._parent) return this._parent._write(string)
    this._buffers[this._currentBuffer] += string
  }

  _indent (block) {
    this._indentLevel += 1
    block(this)
    this._indentLevel -= 1
  }

  _line (source, semicolon = true) {
    let i = this._indentLevel
    while (i--) this._write(this.tab_())
    this._write(source)
    if (semicolon) this._write(';')
    this._newline()
  }

  _newline () {
    this._write('\n')
  }

  attributes_ (names) {}

  compileRegex_ (charClass, name) {}

  assign_ (name, value) {
    this._line(name + ' = ' + value)
  }

  return_ (expression) {
    this._line('return ' + expression)
  }

  decrement_ (variable) {
    this._line(variable + ' -= 1')
  }

  isZero_ (expression) {
    return expression + ' <= 0'
  }
}

module.exports = Base
