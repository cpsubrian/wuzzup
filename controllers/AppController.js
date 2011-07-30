/**
 * Basic Application Controller.
 */
var AppController = function(app, conf) {
  this.app = app;
  this.conf = conf;
  
  // GET Routes.
  app.get('/', this.index);
  
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

// Export the AppController.
module.exports = function(app, conf) {
  return new AppController(app, conf);
};
