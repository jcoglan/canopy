require 'bundler/setup'
require 'benchmark/ips'
require 'citrus'
require 'parslet'
require 'treetop'

Canopy = Module.new
dir = File.expand_path('..', __FILE__)

require dir + '/canopy/json'
require dir + '/canopy/lisp'
require dir + '/canopy/peg'

Citrus.load dir + '/citrus/json'
Citrus.load dir + '/citrus/lisp'
Citrus.load dir + '/citrus/peg'

require dir + '/parslet/json'
require dir + '/parslet/lisp'
require dir + '/parslet/peg'

Treetop.load dir + '/treetop/json'
Treetop.load dir + '/treetop/lisp'
Treetop.load dir + '/treetop/peg'

pkg     = File.read(File.expand_path('../../package.json', __FILE__))
program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))'
grammar = File.read(File.expand_path('../canopy/peg.peg', __FILE__))

Benchmark.ips do |ips|
  ips.report('Canopy JSON')  { CanopyJson.parse(pkg) }
  ips.report('Citrus JSON')  { CitrusJson.parse(pkg) }
  ips.report('Parslet JSON') { ParsletJson.new.parse(pkg) }
  ips.report('Treetop JSON') { TreetopJsonParser.new.parse(pkg) }

  ips.report('Canopy Lisp')  { CanopyLisp.parse(program) }
  ips.report('Citrus Lisp')  { CitrusLisp.parse(program) }
  ips.report('Parslet Lisp') { ParsletLisp.new.parse(program) }
  ips.report('Treetop Lisp') { TreetopLispParser.new.parse(program) }

  ips.report('Canopy PEG')  { Canopy::PEG.parse(grammar) }
  ips.report('Citrus PEG')  { CitrusPEG.parse(grammar) }
  ips.report('Parslet PEG') { ParsletPEG.new.parse(grammar) }
  ips.report('Treetop PEG') { TreetopPEGParser.new.parse(grammar) }
end
