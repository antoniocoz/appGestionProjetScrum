var mongoose = require('mongoose');

var BacklogSchema = new mongoose.Schema({
  title: String,
  description: String
});

mongoose.model('Backlog', BacklogSchema);