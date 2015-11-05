var mongoose = require('mongoose');

var USSchema = new mongoose.Schema({
  body: String,
  priority: {type: Number, default: 0},
  difficulty: {type: Number, default: 0},
  backlog: { type: mongoose.Schema.Types.ObjectId, ref: 'Backlog' }
});

mongoose.model('US', USSchema);