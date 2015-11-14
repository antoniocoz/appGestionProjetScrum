
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sprint = mongoose.model('Sprint');
var US = mongoose.model('US');

router.get('/sprints/:backlog', function(req, res) {
    var query = {"backlog": req.params.backlog};
    Sprint.find(query, function(err, doc) {
      if (err) { return next(err); }
        res.json(doc);
    });
});

router.post('/sprints', function(req, res, next) {
  var sp = new Sprint(req.body);
  console.log("test");
  console.log(req.body);

  sp.save(function(err, us){
    if(err){ return next(err); }
    res.json(sp);
  });
});

router.put('/sprints/:sprint', function(req, res) {
  var title = req.body.title;
  
  var query = {"_id":req.params.sprint};

      Sprint.findOneAndUpdate(query, {title: title}, { 'new': true }, function(doc) {
        res.json(doc);  
      });
});

router.put('/userStories/:userStory', function(req, res) {
  var sprint = req.body.sprint;
  
  var query = {"_id":req.params.userStory};

      US.findOneAndUpdate(query, {sprint: sprint}, { 'new': true }, function(doc) {
        res.json(doc);  
      });
});

router.delete('/sprints/:sprint', function(req, res) {
  Sprint.remove({_id: req.params.sprint}, function(err, doc) {
    if (err) { return next(err); }
      res.json(doc);
    });
});

module.exports = router;