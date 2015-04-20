require 'bundler/setup'
require 'benchmark/ips'
require 'citrus'
require 'treetop'

Canopy = Module.new
dir = File.expand_path('..', __FILE__)

require dir + '/canopy/lisp'
require dir + '/canopy/peg'
Citrus.load dir + '/citrus/lisp'
Citrus.load dir + '/citrus/peg'
Treetop.load dir + '/treetop/lisp'
Treetop.load dir + '/treetop/peg'

program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))'
grammar = File.read(File.expand_path('../canopy/peg.peg', __FILE__))

Benchmark.ips do |ips|
  ips.report('Canopy Lisp')  { CanopyLisp.parse(program) }
  ips.report('Citrus Lisp')  { CitrusLisp.parse(program) }
  ips.report('Treetop Lisp') { TreetopLispParser.new.parse(program) }

  ips.report('Canopy PEG')  { Canopy::PEG.parse(grammar) }
  ips.report('Citrus PEG')  { CitrusPEG.parse(grammar) }
  ips.report('Treetop PEG') { TreetopPEGParser.new.parse(grammar) }
end
