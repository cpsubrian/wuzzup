/**
 * General tests for the application.
 */
process.env['NODE_ENV'] = 'test';

var vows = require('vows'),
    tobi = require('tobi'),
    should = require('should'),
    app = require('../app'),
    conf = require('../conf'),
    macros = require('./macros')(app);

vows.describe('Application').addBatch({
  'An unauthenticated visit to the front page': {
    topic: getUrl('/'),
    
    'should have a status of 200': function(_, res, $){
      res.should.have.status(200);
    },
    'should have a title matching the conf': function(_, res, $) {
      $('h1').should.have.text(conf.title);
    },
    'should have a twitter login button': function(_, res, $) {
      $('#twitter-login').should.have.one('a');
    }
  }
  
}).export(module);
