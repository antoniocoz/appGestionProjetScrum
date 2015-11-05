var mongoose = require('mongoose');

var USSchema = new mongoose.Schema({
  body: String,
  priority: {type: Number, default: 0},
  difficulty: {type: Number, default: 0},
  backlog: String
});

mongoose.model('US', USSchema);