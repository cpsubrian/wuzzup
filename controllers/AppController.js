/**
 * Basic Application Controller.
 */
var AppController = function(app, settings) {
  this.app = app;
  this.settings = settings;
  
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
module.exports = function(app, settings) {
  return new AppController(app, settings);
};
