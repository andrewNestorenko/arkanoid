
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer();

// Socket.io

var io = require('socket.io').listen(app);

// Configuration

require('./configs/socket.io')(io);
require('./configs/application')(app);
require('./configs/helpers')(app);

// Routes

require('./configs/routes')(app);

app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
