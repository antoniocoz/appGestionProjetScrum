var mongoose = require('mongoose');

var Tacheschema = new mongoose.Schema({
  numero: {type: Number, default: 0},
  description: String,
  dure: {type: Number, default: 0},
  delaiplustot: {type: Number, default: 0},
  delaiplustard: {type: Number, default: 0},
  usId: String,
  tacheId:[]
});

mongoose.model('Tache', Tacheschema);