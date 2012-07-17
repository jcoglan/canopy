JS.ENV.CanopySpec = JS.Test.describe("Canopy", function() { with(this) {
  describe('formatError', function() { with(this) {
    before(function() { with(this) {
      this.parseError = {
        offset:     20,
        expected :  'X',
        actual:     'i',
        input: '(define (foo x)\n' +
               '  (print x))'
      }
    }})
    
    it("produces a user-friendly error report", function() { with(this) {
      var report = Canopy.formatError(this.parseError)
      assertEqual ( 'Line 2: expected X\n' +
                    '  (print x))\n' +
                    '    ^',
                    report )
    }})
  }})
}})
