JSCLASS_PATH = 'vendor/js.class/build/src'
load(JSCLASS_PATH + '/loader.js')

JS.Packages(function() { with(this) {
    file('build/canopy-min.js').provides('Canopy')
    autoload(/^(.*)Spec$/, {from: 'spec', require: '$1'})
}})

require('JS.Test', 'Canopy', function() {
    
    Canopy.SpecHelper = new JS.Module({
      assertParse: function(tuple, actual) {
        this.__wrapAssertion__(function() {
          this.assertKindOf( Canopy.SyntaxNode, actual )
          
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
    
    require(/* Parser classes were used during bootstrapping
            
            'Canopy.Parser.CharClassSpec',
            'Canopy.Parser.ChoiceSpec',
            'Canopy.Parser.GrammarSpec',
            'Canopy.Parser.LabelSpec',
            'Canopy.Parser.MaybeSpec',
            'Canopy.Parser.AndSpec',
            'Canopy.Parser.NotSpec',
            'Canopy.Parser.RepeatSpec',
            'Canopy.Parser.SequenceSpec',
            'Canopy.Parser.StringSpec',
            'Canopy.Parser.TypeSpec',*/
            
            'Canopy.MetaGrammarParserSpec',
            
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

