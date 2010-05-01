benchmark = function(name, n, block) {
  var start = Number(new Date), i = n;
  while (i--) block();
  var end = Number(new Date);
  print(name + ': ' + n + 'x :: ' + ((end - start) / 1000) + 's');
};

