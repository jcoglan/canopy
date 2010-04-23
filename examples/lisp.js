load('vendor/js.class/build/min/core.js');
load('build/stake-min.js');

LispParser  = Stake.Parser.fromSexp(['grammar', 'Lisp',
    
    ['rule', 'program',
      ['repeat', 1, ['reference', 'cell']]],
    
    ['rule', 'cell',
      ['sequence',
        ['repeat', 0, ['reference', 'space']],
        ['label', 'data',
          ['choice',
            ['reference', 'list'],
            ['reference', 'atom']]],
        ['repeat', 0, ['reference', 'space']]]],
    
    ['rule', 'list',
      ['sequence',
        ['string', '('],
        ['label', 'cells',
          ['repeat', 0, ['reference', 'cell']]],
        ['string', ')']]],
    
    ['rule', 'atom',
      ['choice',
        ['reference', 'boolean'],
        ['reference', 'integer'],
        ['reference', 'string'],
        ['reference', 'symbol']]],
    
    ['rule', 'boolean',
      ['choice',
        ['string', '#t'],
        ['string', '#f']]],
    
    ['rule', 'integer',
      ['sequence',
        ['char-class', '[1-9]'],
        ['repeat', 0, ['char-class', '[0-9]']]]],
    
    ['rule', 'string',
      ['sequence',
        ['string', '"'],
        ['repeat', 0, ['char-class', '[^"]']],
        ['string', '"']]],
    
    ['rule', 'symbol',
      ['repeat', 1,
        ['sequence',
          ['not', ['reference', 'delimiter']],
          ['any-char']]]],
    
    ['rule', 'space',
      ['char-class', '[\\s\\n\\r\\t]']],
    
    ['rule', 'paren',
      ['choice',
        ['string', '('],
        ['string', ')']]],
    
    ['rule', 'delimiter',
      ['choice',
        ['reference', 'paren'],
        ['reference', 'space']]]]);

