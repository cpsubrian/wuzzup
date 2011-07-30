/**
 * User model.
 */
module.exports =  function(app, conf) {
  var Schema = app.db.Schema;
  var UserSchema = new Schema({
    'name' : String,
    'email': {type: String, index: {unique: true}, 
  });
  
  app.db.model('User', UserSchema);
  return app.db.model('User');
};
