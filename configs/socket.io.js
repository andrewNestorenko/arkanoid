
module.exports = function(io) {

    var transports = [
          'websocket'
        , 'flashsocket'
        , 'htmlfile'
        , 'xhr-polling'
        , 'jsonp-polling'
    ];

    /** default config */
    io.configure(function() {
        io.set('transports', transports);
    });

    /** development config */
    io.configure('development', function() {
        io.set('transports', transports);
    });

    /** production config */
    io.configure('production', function() {
        io.enable('browser client minification');
        io.enable('browser client etag');
        io.set('log level', 1);
        io.set('transports', transports);
    });
};
