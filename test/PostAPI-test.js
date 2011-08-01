/**
 * Tests for the PostController.
 */
process.env['NODE_ENV'] = 'test';

var vows = require('vows'),
    tobi = require('tobi'),
    should = require('should'),
    app = require('../app'),
    conf = require('../conf');

/**
 * Macros
 */
var getBrowser = function() {
  return tobi.createBrowser(app);
}

/**
 * Tests
 */
vows.describe('Post API').addBatch({
  'An unauthenticated visit to the front page': {
    topic: function() {
      var browser = getBrowser();
      browser.get('/', this.callback);
    },    
    'should have a status of 200': function(res, $){
      res.should.have.status(200);
    },
  }
  
}).export(module);

