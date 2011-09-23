/**
 * Module dependencies.
 */

var express                                   = require('express'),
    app           = module.exports            = express.createServer();
app.modules = {};
var sessionStore  = app.sessionStore          = require("connect-mongoose")(express),
    mongoose      = app.modules.mongoose      = require('mongoose'),
    everyauth     = app.modules.everyauth     = require('everyauth'),
    mongooseAuth  = app.modules.mongooseAuth  = require('mongoose-auth'),
    conf                                      = require('./conf.js');

// Load Models.
app.db = mongoose;
app.models = {};
app.models.User = require('./models/User.js')(app, conf);
app.models.Post = require('./models/Post.js')(app, conf);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register(".html", require("jqtpl").express);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret:  conf.session.secret, store: new sessionStore() }));
  app.use(mongooseAuth.middleware());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.db.connect(conf.mongodb.uri.development);
  everyauth.debug = true;
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
mongooseAuth.helpExpress(app);
require('./helpers.js')(app, conf);

// Load Controllers.
app.controllers = {};
app.controllers.error = require('./controllers/ErrorController.js')(app, conf);
app.controllers.user = require('./controllers/UserController.js')(app, conf);
app.controllers.app = require('./controllers/AppController.js')(app, conf);
app.controllers.post = require('./controllers/PostController.js')(app, conf);

// Catch-all 404 handler (Do not add any routes below this).
app.get('/*', function(req, res, next) {
  next(new NotFound('Page not found.'));
});

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(conf.port);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
