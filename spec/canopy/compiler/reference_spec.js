JS.ENV.Canopy.Compiler.ReferenceSpec = JS.Test.describe("Canopy.Compiler.Reference",
function() { with(this) {
  include(Canopy.SpecHelper)

  describe('with two rules and a reference', function() { with(this) {
    describe('where the root only contains a reference', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.OneRefTest \
          first <- second \
          second <- "bar"')
      }})

      it('parses strings matching the referenced rule', function() { with(this) {
        assertParse( ['bar', 0, []], OneRefTest.parse('bar') )
      }})

      it('does not parse strings that do not match the referenced rule', function() { with(this) {
        assertThrows(Error, function() { OneRefTest.parse('foo') })
      }})
    }})

    describe('where the root contains the reference as part of a sequence', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.OneRefWithSequenceTest \
          first <- second "end" \
          second <- "begin"')
      }})

      it('presents the reference as a labelled element', function() { with(this) {
        assertParse(['beginend', 0, [
                      ['begin', 0, []],
                      ['end', 5, []]], {
                      second: ['begin', 0, []]
                    }],

          OneRefWithSequenceTest.parse('beginend') )
      }})
    }})

    describe('where the root contains the reference as part of a sub-sequence', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.OneRefWithSubSequenceTest \
          first <- (second "sub") "end" \
          second <- "begin"')
      }})

      it('presents the reference as a labelled element in the subsequence', function() { with(this) {
        assertParse(['beginsubend', 0, [
                      ['beginsub', 0, [
                        ['begin', 0, []],
                        ['sub', 5, []]], {
                        second: ['begin', 0, []]
                      }],
                      ['end', 8, []]]],

          OneRefWithSubSequenceTest.parse('beginsubend') )
      }})
    }})

    describe('when the root contains the reference as part of a choice', function() { with(this) {
      before(function() { with(this) {
        Canopy.compile('grammar JS.ENV.OneRefWithChoice \
          first <- second / "end" \
          second <- "begin"')
      }})

      it('parses the first branch of the choice', function() { with(this) {
        assertParse( ['begin', 0, []], OneRefWithChoice.parse('begin') )
      }})

      it('parses the second branch of the choice', function() { with(this) {
        assertParse( ['end', 0, []], OneRefWithChoice.parse('end') )
      }})
    }})
  }})
}})
