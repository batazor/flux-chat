var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({

  avatar:      String,
  nickname:    String,
  email:       String,
  locale:      { type: String, default: 'en' },

  local: {
    email:     String,
    password:  String
  },

  facebook : {
    id:        String,
    token:     String,
    email:     String,
    name:      String
  },

});

// methods =====================================================================
// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);
