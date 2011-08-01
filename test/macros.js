/**
 * Test Macros.
 */
var tobi = require('tobi');

module.exports = function(app) {
  /**
   * Setup/Teardown.
   */
  global.setupCleanApp = function(callback) {
    return callback;
  }
  
  
  /**
   * Topic Macros.
   */
  global.getUrl = function(url) {
    return function() {
      var browser = tobi.createBrowser(app);
      browser.get(url, this.callback.bind(this, null));
    }
  }
  global.postUrl = function(url, data) {
    return function() {
      var browser = tobi.createBrowser(app);
      data = JSON.stringify(data);
      browser.post(url, data, this.callback.bind(this, null));
    }
  }
  global.putUrl = function(url, data) {
    return function() {
      var browser = tobi.createBrowser(app);
      data._method = 'PUT';
      data = JSON.stringify(data); 
      browser.post(url, data, this.callback.bind(this, null));
    }
  }
  global.delUrl = function(url) {
    return function() {
      var browser = tobi.createBrowser(app);
      data._method = 'DELETE';
      data = JSON.stringify(data);
      browser.post(url, data, this.callback.bind(this, null));
    }
  }
  
  /**
   * Vow Macros.
   */
  
  
  return true;
}