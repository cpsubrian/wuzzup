/**
 * Application helpers.  These are available in all rendered template.
 */
module.exports = function(app, conf) {
  app.helpers({
    // Application title.
    title: conf.title,  
    
    // Return scripts from settings.js
    headScripts: function() {
      return conf.scripts['head'].map(function(src) {
        return '<script type="text/javascript" src="' + src + '"></script>'
      }).join("\n");
    },
    footerScripts: function(req, res) {
      return conf.scripts['footer'].map(function(src) {
        return '<script type="text/javascript" src="' + src + '"></script>'
      }).join("\n");
    }
  });
  app.dynamicHelpers({
    authGlobal: function(req, res) {
      return '<script type="text/javascript">var authenticated = ' + (req.user ? 'true' : 'false') + '</script>'; 
    }
  });
}