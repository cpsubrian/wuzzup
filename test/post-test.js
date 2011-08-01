/**
 * Tests for the Post API.
 */
process.env['NODE_ENV'] = 'test';

var vows = require('vows'),
    tobi = require('tobi'),
    should = require('should'),
    app = require('../app'),
    conf = require('../conf'),
    macros = require('./macros')(app);

vows
  .describe('Post API')
  
  // Authenticated API tests.
  .addBatch({
    'An authenticated user': {
      topic: function() {
        
      }
    }
  })
  
  // Unauthenticated API tests.
  .addBatch({
    'An unauthenticated user': {
      'attempting to create a new post': {
        topic: postUrl('/posts.json', {body: 'This is my test post'}),
        'should receive a status of 403': function(_, res, $){
          res.should.have.status(403);
        },
      }
    }
  })
  
  .export(module);

