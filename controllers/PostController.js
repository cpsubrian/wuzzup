/**
 * Post Controller.
 */
var Post;
var User;

/**
 * PostController Constructor.
 */
var PostController = function(app, conf) {
  this.app = app;
  this.conf = conf;
  
  Post = app.models.Post;
  User = app.models.User;
  
  // GET Routes.
  app.get('/posts.:format?', this.listPosts);
  app.get('/posts/:postId.:format?', this.readPost);
  
  // POST Routes.
  app.post('/posts.:format?', this.createPost);
  
  // PUT Routes.
  app.put('/posts/:postId.:format?', this.updatePost);
  
  // DELETE Routes.
  app.del('/posts/:postId.:format?', this.deletePost);
}

/**
 * List Posts.
 */
PostController.prototype.listPosts = function(req, res) {
  Post.find({}, function(err, posts) {
    switch (req.params.format) {
      case 'json':
        res.send(posts.map(function(post) {
          return post.toJSON();
        }));
        break;

      default:
        // TODO Implement html version.
    }
  });
}

/**
 * Read a Post.
 */
PostController.prototype.readPost = function(req, res) {
  switch (req.params.format) {
    case 'json':
      res.send(req.loaded.doc.toJSON());
      break;
  
    default:
      // TODO implement html version.
  }
}

/**
 * Create a Post.
 */
PostController.prototype.createPost = function(req, res) {
  if (!req.user) {
    // TODO implement error handling.
  }
  else {
    var post = new Post({body: req.body['body'], user: req.user._id);
    post.save(function() {
      switch (req.params.format) {
        case 'json':
          res.send(post.toJSON());
          break;
  
        default:
          // TODO implement html version.
      }
    });
  }
}

/**
 * Update a Post.
 */
PostController.prototype.updatePost = function(req, res) {
  var post = req.loaded.post;
  post.body = req.body['body'];
  post.save(function() {
    switch (req.params.format) {
      case 'json':
        res.send(post.toJSON());
       break;

       default:
        // TODO implement html version.
    }
  });
}

/**
 * Delete a Post.
 */
PostController.prototype.deletePost = function(req, res) {
  req.loaded.post.remove(function() {
    switch (req.params.format) {
      case 'json':
        res.send('true');
       break;

       default:
        // TODO implement html version.
    }
  });
}

// Export a new instance of a PostController.
module.exports = function(app, conf) {
  return new PostController(app, conf);
};
