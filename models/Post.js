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
  
  // Return the User model.
  return Post;
};
