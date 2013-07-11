// SERVER
var multi = require('multisocket')()

var usernames = {};



multi.on('leave', function () {
  delete usernames[this.id];
  multi('usernames').write(usernames);
  multi('global').write(this.id + ' left');
})
