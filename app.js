
/**
 * Module dependencies.
 */

var express = require('express'),
    app = module.exports = express.createServer(),
    conf = require('./conf.js'),
    mongoose = app.db = require('mongoose');


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register(".html", require("jqtpl").express);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret:  conf.session.secret}));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.db.connect(conf.mongodb.uri.development);
});
app.configure('test', function() {
  app.use(express.errorHandler());
  app.db.connect(conf.mongodb.uri.test);
});
app.configure('production', function(){
  app.use(express.errorHandler()); 
  app.db.connect(conf.mongodb.uri.production);
});

// Helpers
app.helpers(require('./helpers.js')(app, conf));

// Load Models.
app.models.User = require('./models/User.js')(app, conf);

// Load Controllers.
require('./controllers/ErrorController.js')(app, conf);
require('./controllers/AppController.js')(app, conf);

// Catch-all 404 handler (Do not add any routes below this).
app.get('/*', function(req, res, next) {
  next(new NotFound('Page not found.'));
});

//Only listen on $ node app.js
if (!module.parent) {
  app.listen(conf.port);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
