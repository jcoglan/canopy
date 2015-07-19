# Building and testing Canopy

To build and test the project, you will need to install dependencies for several
languages. The build and test suite only requires Node.js installed, and you
only need other languages and libraries installed to run the examples for those
languages.

## Getting the source code

    git clone git://github.com/jcoglan/canopy.git

## Installing dependencies

To install the dependencies for the build and test suite:

    npm install

To install the dependencies for the Python examples:

    pip install -r requirements.txt

To install the dependencies for the Ruby examples (and the tools used to build
the website):

    bundle install

## Building the project

To build the project from source (required to run the tests and generate the
example parsers):

    npm run build

To recompile the metagrammar, if you've edited `meta_grammar.peg`:

    npm run compile

To regenerate the example Canopy parsers:

    npm run java
    npm run js
    npm run python
    npm run ruby

To regenerate the example PEG.js parsers:

    npm run pegjs

## Running the tests

To run the test suite, on various JS runtimes:

    npm test
    rhino spec/console.js
    ringo spec/console.js

To run the test suite in the browser:

    open spec/browser.html

## Running the examples

To run the Java examples:

    javac examples/JavaExample.java && java examples.JavaExample

To run the JavaScript examples:

    node examples/javascript.js

To run the Python examples:

    py.test examples/python.py

To run the Ruby examples:

    ruby examples/ruby.rb
