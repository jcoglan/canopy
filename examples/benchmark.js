module.exports = function(name, n, block) {
  var start = Number(new Date), i = n;
  while (i--) block();
  var t = (Number(new Date) - start) / 1000;
  console.log(name + ': ' + n + 'x :: ' + t + 's');
};

