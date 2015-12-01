var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  forename: String,
  surname: String,
  contact: String,
  backlog: String
});

mongoose.model('User', UserSchema);