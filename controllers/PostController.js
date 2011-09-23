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
  
  UserController = app.controllers.user;
  
  // Params.
  app.param('postId', function(req, res, next, id){
    Post.findById(id, function(err, post){
      if (err) return next(err);
      if (!post) return next(new Error('failed to find post'));
      req.post = post;
      next();
    });
  });
    
  // GET Routes.
  app.get('/posts.:format?', this.listPosts);
  app.get('/posts/:postId.:format?', this.readPost);
  
  // POST Routes.
  app.post('/posts.:format?', UserController.requireUser, this.createPost);
  
  // PUT Routes.
  app.put('/posts/:postId.:format?', UserController.requireUser, this.updatePost);
  
  // DELETE Routes.
  app.del('/posts/:postId.:format?', UserController.requireUser, this.deletePost);
};

/**
 * List Posts.
 */
PostController.prototype.listPosts = function(req, res) {
  Post.find({}).sort('updatedAt', 1).run(function(err, posts) {
    switch (req.params.format) {
      case 'json':
      default:
        res.send(posts.map(function(post) {
          return post.toJSON();
        }), {'Content-Type' : 'application/json'});
        break;
    }
  });
};

/**
 * Read a Post.
 */
PostController.prototype.readPost = function(req, res) {
  switch (req.params.format) {
    case 'json':
    default:
      res.send(req.post.toJSON(), {'Content-Type' : 'application/json'});
      break;
  }
};

/**
 * Create a Post.
 */
PostController.prototype.createPost = function(req, res) {
  var post = new Post({body: req.body.body, user: req.user._id});
  post.save(function() {
    switch (req.params.format) {
      case 'json':
      default:
        res.send(post.toJSON(), {'Content-Type' : 'application/json'});
        break;
    }
  });
};

/**
 * Update a Post.
 */
PostController.prototype.updatePost = function(req, res) {
  var post = req.post;
  post.body = req.body['body'];
  post.save(function() {
    switch (req.params.format) {
      case 'json':
      default:
        res.send(post.toJSON(), {'Content-Type' : 'application/json'});
       break;;
    }
  });
};

/**
 * Delete a Post.
 */
PostController.prototype.deletePost = function(req, res) {
  req.post.remove(function() {
    switch (req.params.format) {
      case 'json':
      default:
        res.send('true', {'Content-Type' : 'application/json'});
       break;;
    }
  });
};

// Export a new instance of a PostController.
module.exports = function(app, conf) {
  return new PostController(app, conf);
};
