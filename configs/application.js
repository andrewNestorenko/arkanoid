
var express = require('express')
  , applicationPath = __dirname + '/..'
  , publicPath = applicationPath + '/public';

module.exports = function(app) {

    app.configure(function() {
        app.set('views', applicationPath + '/views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(require('stylus').middleware({ src:publicPath }));
        app.use(app.router);
        app.use(express.static(publicPath));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    });

    app.configure('production', function() {
        app.use(express.errorHandler());
    });
};
