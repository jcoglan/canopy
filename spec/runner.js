JS.Packages(function() { with(this) {
    var CWD = JS.ENV.CWD || '.'
    autoload(/^(.*)Spec$/, {from: CWD + '/spec', require: '$1'})
}})

JS.require('JS.Test', function() {
    
    Canopy.SpecHelper = new JS.Module({
      assertParse: function(tuple, actual) {
        this.__wrapAssertion__(function() {
          this.assertEqual( tuple[0], actual.textValue )
          this.assertEqual( tuple[1], actual.offset )
          
          if (!tuple[2]) return;
          this.assertEqual( tuple[2].length, actual.elements.length )
          for (var i = 0, n = tuple[2].length; i < n; i++)
            this.assertParse( tuple[2][i], actual.elements[i] )
          
          if (!tuple[3]) return;
          for (var key in tuple[3])
            this.assertParse( tuple[3][key], actual[key] )
        })
      }
    })
    
    JS.require( 'Canopy.MetaGrammarParserSpec',
                'CanopySpec',
                'Canopy.Compiler.AnyCharSpec',
                'Canopy.Compiler.CharClassSpec',
                'Canopy.Compiler.StringSpec',
                'Canopy.Compiler.PredicatedAtomSpec',
                'Canopy.Compiler.RepeatSpec',
                'Canopy.Compiler.SequenceSpec',
                'Canopy.Compiler.ChoiceSpec',
                'Canopy.Compiler.ChoicePartSpec',
                'Canopy.Compiler.ReferenceSpec',
                
                JS.Test.method('autorun'))
})

