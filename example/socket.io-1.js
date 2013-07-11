// SERVER
var shoe = require('shoe');
var http = require('http');

var multi = require('multisocket')();
multi.on('connection', function () {
  multi('client-' + this.id)
    .on('data', console.log)
    .write('hey there!')
});

var server = http.createServer();
var sock = shoe(function (con) {
  multi.pipe(con).pipe(multi);
});
sock.install(server, '/socket');

// CLIENT
var multi = require('multisocket')();
multi('client-' + multi.id).on('data', function (data) {
  console.log(data);
  socket.emit('')
})

var shoe = require('shoe');
var sock = shoe.connect('/socket');
multi.pipe(shoe).pipe(multi);
