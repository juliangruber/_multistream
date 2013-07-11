// SERVER
var multi = require('multisocket')();
multi('echo').pipe(multi('echo'));

// CLIENT
var multi = require('multisocket')();

setInterval(function () {
  multi('echo').write('olah');
}, 1000);

multi('echo').on('data', console.log);
