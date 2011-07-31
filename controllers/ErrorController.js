/**
 * Custom Error Handling.
 * 
 * Note: app.error does not work if you are using the errorHandler middleware.
 */

var sys = require('sys');

//Define some error types.
var NotFound = global.NotFound = function (msg) {
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}
sys.inherits(NotFound, Error);


/**
 * Error Controller.
 */
var ErrorController = function(app, conf) {
  this.app = app;
  this.conf = conf;
  
  // Errors will fall through these handlers via next().
  app.error(this.notFound404);
  app.error(this.serverError505);  
}
  
/**
 * 404 - NotFound.
 */
ErrorController.prototype.notFound404 = function(err, req, res, next) {
  if (err instanceof NotFound) {
    res.render('errors/404', { status: 404 });
  } else {
    next(err);
  }
}

/**
 * 500 - ServerError
 */
ErrorController.prototype.serverError505 = function(err, req, res) {
  res.render('errors/500', {
    status: 500,
    locals: {
      error: err
    } 
  });
}

// Export a new instance of a ErrorController.
module.exports = function(app, conf) {
  return new ErrorController(app, conf);
};
