/**
 * Basic Application Controller.
 */
var AppController = function(app, conf) {
  this.app = app;
  this.conf = conf;
  
  // GET Routes.
  app.get('/', this.index);
  app.get('/logout', this.logout);
  
  // POST Routes.
  
  // PUT Routes.
  
  // DELETE Routes.
}

/**
 * Index Page.
 */
AppController.prototype.index = function(req, res) {
  res.render('index');
}

/**
 * Logout.
 */
AppController.prototype.logout =  function (req, res) {
  req.logout();
  res.redirect('/');
};

// Export the AppController.
module.exports = function(app, conf) {
  return new AppController(app, conf);
};
