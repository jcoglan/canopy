'use strict'

const { readFileSync } = require('fs')
const { basename, dirname, join } = require('path')
const handlebars = require('handlebars')

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

  serialize () {
    return this._buffers
  }

  _tab () {
    return '  '
  }

  _newBuffer (ext, name = null) {
    let dir  = dirname(this.filename),
        base = basename(this.filename, PEG_EXT)

    if (name) {
      this._currentBuffer = join(dir, base, name + '.' + ext)
    } else {
      this._currentBuffer = join(dir, base + '.' + ext)
    }
    this._buffers[this._currentBuffer] = this._initBuffer(this._currentBuffer)
  }

  _initBuffer (pathname) {
    return ''
  }

  _template (lang, name, args) {
    let pathname = join(__dirname, '..', '..', 'templates', lang, name),
        template = handlebars.compile(readFileSync(pathname, 'utf8')),
        result   = template(args).replace(/\s*$/, '')

    for (let line of result.split(/\n/))
      this._line(line, false)
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

    if (source.length > 0) {
      while (i--) this._write(this._tab())
      this._write(source)
      if (semicolon) this._write(';')
    }
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
