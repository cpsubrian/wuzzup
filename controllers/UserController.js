/**
 * User Controller.
 */
var UserController = function(app, conf) {
  this.app = app;
  this.conf = conf;
  
  // GET Routes.
  
  // POST Routes.
  
  // PUT Routes.
  
  // DELETE Routes.
}

/**
 * Route middleware to required an authenticated user.
 */
UserController.prototype.requireUser = function(req, res, next) {
  if (!req.user) {
    // TODO implement better error handling.
    res.send('Error', 403);
  }
  else {
    next();
  }
}

// Export a new instance of an UserController.
module.exports = function(app, conf) {
  return new UserController(app, conf);
};
