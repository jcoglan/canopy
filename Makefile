SHELL := /bin/bash
PATH  := $(PATH):node_modules/.bin

src_files := $(shell find source -type f)
lib_files := $(src_files:source/%=lib/%)

.PHONY: bootstrap compile test examples clean

bootstrap: test $(lib_files)

lib/%: source/%
	mkdir -p $(@D)
	rsync -av $< $@

compile: source/canopy/meta_grammar.js

source/canopy/meta_grammar.js: source/canopy/meta_grammar.peg
	./bin/canopy $< --lang javascript

test:
	find spec -name '*_spec.js' | xargs jstest

examples: java js python ruby pegjs

%:
	find examples/canopy -name '*.peg' -exec ./bin/canopy --lang $@ {} \;

pegjs:
	find examples/pegjs -name '*.peg' -exec pegjs --cache {} \;

clean:
	find examples -name '*.class' -o -name '*.pyc' -exec rm {} \;
