import os
import canopy.lisp
import canopy.peg
from parsimonious.grammar import Grammar

dirname = os.path.dirname(__file__)

lisp_file = os.path.join(dirname, 'parsimonious', 'lisp.peg')
with open(lisp_file) as f:
    parsimonious_lisp = Grammar(f.read())

peg_file = os.path.join(dirname, 'parsimonious', 'peg.peg')
with open(peg_file) as f:
    parsimonious_peg = Grammar(f.read())

program = '(lambda (x y) (display "Hi.") (+ (* x y) 2))'

grammar_file = os.path.join(dirname, 'canopy', 'peg.peg')
with open(grammar_file) as f:
    grammar = f.read()

def test_canopy_parse_lisp(benchmark):
    @benchmark
    def canopy_parse_lisp():
        canopy.lisp.parse(program)

def test_parsimonious_parse_lisp(benchmark):
    @benchmark
    def parsimonious_parse_lisp():
        parsimonious_lisp.parse(program)

def test_canopy_parse_peg(benchmark):
    @benchmark
    def canopy_parse_peg():
        canopy.peg.parse(grammar)

def test_parsimonious_parse_peg(benchmark):
    @benchmark
    def parsimonious_parse_peg():
        parsimonious_peg.parse(grammar)
