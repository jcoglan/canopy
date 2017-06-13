'use strict'

var jstest = require('jstest').Test

require('./canopy/meta_grammar_spec')
require('./canopy_spec')
require('./canopy/compiler/any_char_spec')
require('./canopy/compiler/char_class_spec')
require('./canopy/compiler/choice_part_spec')
require('./canopy/compiler/choice_spec')
require('./canopy/compiler/predicate_spec')
require('./canopy/compiler/reference_spec')
require('./canopy/compiler/repeat_spec')
require('./canopy/compiler/sequence_spec')
require('./canopy/compiler/string_spec')

jstest.autorun()
