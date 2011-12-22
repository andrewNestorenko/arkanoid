
module.exports = function(io) {
    io.sockets.on('connection', function(socket) {

        socket.on('update status', function(data) {

        });

        socket.on('disconnect', function() {

        });
    });
};
