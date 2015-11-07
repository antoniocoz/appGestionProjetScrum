var express = require('express');
var router = express.Router();

//GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//var mongoose = require('mongoose');
//var Backlog = mongoose.model('Backlog');
//var US = mongoose.model('US');
/*
//Get all backlogs
router.get('/backlogs', function(req, res, next) {
  Backlog.find(function(err, backlogs){
    if(err){ return next(err); }

    res.json(backlogs);
  });
});

router.post('/backlogs', function(req, res, next) {
  var backlog = new Backlog(req.body);

  backlog.save(function(err, backlog){
    if(err){ return next(err); }
    res.json(backlog);
  });
});

router.param('backlog', function(req, res, next, id) {
  var query = Backlog.findById(id);

  query.exec(function (err, backlog){
    if (err) { return next(err); }
    if (!backlog) { return next(new Error('can\'t find backlog')); }

    req.backlog = backlog;
    return next();
  });
});

//get one backlog with associated US
router.get('/userStories/:backlog', function(req, res) {
    var query = {"backlog": req.backlog._id};
    US.find(query, function(err, doc) {
      if (err) { return next(err); }
        res.json(doc);
    });
});
/*
//get one backlog with associated US
router.get('/backlogs/:backlog', function(req, res) {
    var query = {"_id": req.backlog._id};
    Backlog.findOne(query, function(err, doc) {
      if (err) { return next(err); }
        res.json(doc);
    });
});

//update one backlog with associated US
router.put('/backlogs/:backlog', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
  
  var query = {"_id":req.backlog._id};
  Backlog.findOneAndUpdate(query, {title: title, description: description}, { 'new': true }, function(doc) {
		res.json(doc);
  });
});

//add a new US for one backlog
router.post('/userStories/:backlog', function(req, res, next) {
  var us = new US(req.body);
  us.backlog = req.backlog;

  us.save(function(err, us){
    if(err){ return next(err); }
    res.json(us);
  });
});
/*
//delete one backlog with associated US
router.delete('/backlogs/:backlog', function(req, res) {
  Backlog.remove({_id: req.params.backlog}, function(err, doc) {
    if (err) { return next(err); }
      res.json(doc);
    });
});

//delete one US of one backlog
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
  
  var query = {"_id":req.params.userStory};

      US.findOneAndUpdate(query, {body: body, priority: priority, difficulty: difficulty}, { 'new': true }, function(doc) {
        res.json(doc);  
      });
});
*/
module.exports = router;