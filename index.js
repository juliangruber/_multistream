var MuxDemux = require('mux-demux');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var net = require('net');
var through = require('through');

module.exports = function () {
  var channels = {};
  var mdm = MuxDemux();
  var events = new EventEmitter();
  
  function multi (name) {
    var stream = through();
    if (channels[name]) {
      channels[name].forEach(function (s) {
        s.pipe(stream).pipe(s);
      });
    }
  }

  mdm.on('connection', function (stream) {
    if (!channels[stream.meta]) channels[stream.meta] = [];
    channels[stream.meta].push(stream);

    // TODO: on disconnect
  });

  for (var method in ee) {
    if (typeof ee[method] == 'function') {
      multi[method] = events[method].bind(events)
    }
  }

  multi.createStream = function () {
    return mdm;
  };

  multi.connect = function (addr) {
    var host = 'localhost';
    var port;

    if (typeof addr == 'string') {
      host = addr.split(':')[0];
      port = addr.split(':')[1];
    } else {
      port = addr;
    }

    mdm.pipe(net.connect(port, host)).pipe(mdm);
  };

  multi.listen = function (port) {
    net.createServer(function (con) {
      con.pipe(mdm).pipe(con);
    }.bind(this)).listen(port);
  };

  return multi;
};
