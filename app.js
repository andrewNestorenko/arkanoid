
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , app = module.exports = express.createServer();

// Socket.io

var io = require('socket.io').listen(app);

// Configuration

require('./configs/socket.io')(io);
require('./configs/application')(app);

// Routes

app.get('/', routes.index);

//require('./controllers/socket.io')(io);

app.listen(3001);
