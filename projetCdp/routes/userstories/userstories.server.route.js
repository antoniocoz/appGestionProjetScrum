
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var US = mongoose.model('US');

router.get('/userStories/:backlog', function(req, res) {
    var query = {"backlog": req.params.backlog};
    US.find(query, function(err, doc) {
      if (err) { return next(err); }
        res.json(doc);
    });
});

router.post('/userStories', function(req, res, next) {
  var us = new US(req.body);

  us.save(function(err, us){
    if(err){ return next(err); }
    res.json(us);
  });
});

router.delete('/userStories/:userStory', function(req, res) {
  US.remove({_id: req.params.userStory}, function(err, doc) {
    if (err) { return next(err); }
      res.json(doc);
    });
});

//update one US
router.put('/userStories/:userStory', function(req, res) {
  var body = req.body.body;
  var priority = req.body.priority;
  var difficulty = req.body.difficulty;
  var sprint = req.body.sprint;
  
  var query = {"_id":req.params.userStory};

      US.findOneAndUpdate(query, {body: body, priority: priority, difficulty: difficulty, sprint: sprint}, { 'new': true }, function(doc) {
        res.json(doc);  
      });
});

module.exports = router;