/**
 * Test Macros.
 */
var tobi = require('tobi');
var app, browser;

var macros = module.exports = function(a) {
  app = a;
  browser = tobi.createBrowser(app);
  return macros;
}

/**
 * Setup clean app.
 */
macros.setupCleanApp = function() {
  return function() {
    var self = this;
    
    var createTestUser = function() {
      var testUser = require('./user.js');
      var user = new app.models.User(testUser);
      user.save(function() {
        // Return execution back to Vows.
        self.callback(null, user);
      });
    }
    
    // Remove all old test users.
    app.models.User.count({}, function(err, total){
      if (total) {
        app.models.User.find({}, function(err, users) {
          var count = total;
          users.forEach(function(user) {
            user.remove(function() {
              count--;
              if (count <= 0) {
                createTestUser();
              }
            });
          })
        });
      }
      else {
        createTestUser();
      }
    });
  }
}

/**
 * Authenticate the current browsing session.
 */
macros.authenticate = function() {
  return function() {
    var self = this;
    
  }
}

/**
 * Reset the browser instance.
 */
macros.resetBrowser = function() {
  return function() {
    browser = tobi.createBrowser(app);
    this.callback(null, TRUE);
  }
}

/**
 * Topic Macros.
 */
macros.getUrl = function(url) {
  return function() {
    browser.get(url, this.callback.bind(this, null));
  }
}
macros.postUrl = function(url, data) {
  return function() {
    data = JSON.stringify(data);
    browser.post(url, data, this.callback.bind(this, null));
  }
}
macros.putUrl = function(url, data) {
  return function() {
    data._method = 'PUT';
    data = JSON.stringify(data); 
    browser.post(url, data, this.callback.bind(this, null));
  }
}
macros.delUrl = function(url) {
  return function() {
    data._method = 'DELETE';
    data = JSON.stringify(data);
    browser.post(url, data, this.callback.bind(this, null));
  }
}

/**
 * Vow Macros.
 */
