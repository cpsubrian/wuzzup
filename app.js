
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var settings = require('./settings.js');

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register(".html", require("jqtpl").express);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret:  settings.session.secret}));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});
app.configure('test', function() {
  app.use(express.errorHandler());
});
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Helpers
app.helpers(require('./helpers.js')(app, settings));

// Load Controllers.
require('./controllers/ErrorController.js')(app, settings);
require('./controllers/AppController.js')(app, settings);

// Catch-all 404 handler (Do not add any routes below this).
app.get('/*', function(req, res, next) {
  next(new NotFound('Page not found.'));
});

//Only listen on $ node app.js
if (!module.parent) {
  app.listen(settings.port);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}