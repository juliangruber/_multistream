
# multistream

## Usage

Here is a server:

```js
var MultiStream = require('multistream');
var multi = new MultiStream().listen(3000);

// Emit the current time
setInterval(function () {
  multi('timestamp').write(Date.now());
}, 1000)

// Store client uptime
var clients = {};

multi('heartbeat').on('data', function () {
  if (!clients[this.id]) clients[this.id] = Date.now();
  console.log('client ' + id + ' is up for ' + (Date.now() - clients[this.id]));
});

// Also remove a client on disconnect
multi.on('leave', function () {
  delete clients[this.id];
});
```

And here a client:

```js
var MultiStream = require('multistream');
var multi = new MultiStream().connect(3000);

// Print the current time
multi('timestamp').on('data', function (timestamp) {
  console.log('now: ' + timestamp);
});
```
