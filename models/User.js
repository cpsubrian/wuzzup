/**
 * User model.
 */
module.exports =  function(app, conf) {
  var Schema = app.db.Schema,
      ObjectId = app.db.SchemaTypes.ObjectId,
      mongooseAuth = app.modules.mongooseAuth;
  
  var UserSchema = new Schema({});
  var User;
  
  // MongooseAuth plugin.
  UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
        User: function() {
          return User;
        }
      }
    },
    twitter: {
      everyauth: {
        consumerKey: conf.auth.twitter.consumerKey,
        consumerSecret: conf.auth.twitter.consumerSecret,
        redirectPath: '/'
      }
    }
  });
  
  // Set model.
  User = app.db.model('User', UserSchema);
  
  // Add param preprocessor.
  app.param('userId', function(req, res, next, id) {
    User.findById(id, function(err, user) {
      if (err) {
        return next(err);
      }
      else if (!user) {
        return next(new NotFound('Could not find User'));
      }
      else {
        req.loaded.user = user;
        next();
      }
    });
  });
  
  // Return the User model.
  return User;
};
