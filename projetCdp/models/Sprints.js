var mongoose = require('mongoose');

var SprintSchema = new mongoose.Schema({
  title: String,
  backlog: String
});

mongoose.model('Sprint', SprintSchema);