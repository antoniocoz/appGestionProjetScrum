var mongoose = require('mongoose');

var BacklogSchema = new mongoose.Schema({
  title: String,
  description: String,
  userStories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'US' }]
});

mongoose.model('Backlog', BacklogSchema);