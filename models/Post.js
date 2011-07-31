/**
 * Post model.
 */
module.exports =  function(app, conf) {
  var Schema = app.db.Schema,
      ObjectId = app.db.SchemaTypes.ObjectId,
      mongooseTypes = require("mongoose-types"),
      useTimestamps = mongooseTypes.useTimestamps;
      
  
  // Define the Post Schema.
  var PostSchema = new Schema({
    user: ObjectId,
    body: String,
  });
  
  // Adds 'createdAt' and 'updatedAt' via the useTimestamps plugin.
  PostSchema.plugin(useTimestamps);
  
  // Set model.
  var Post = app.db.model('Post', PostSchema);
  
  // Add param preprocessor.
  app.param('postId', function(req, res, next, id) {
    Post.findById(id, function(err, post) {
      if (err) {
        return next(err);
      }
      else if (!post) {
        return next(new NotFound('Could not find Post'));
      }
      else {
        req.loaded.post = post;
        next();
      }
    });
  });
  
  // Return the User model.
  return Post;
};
