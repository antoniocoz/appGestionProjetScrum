var express = require('express');
var router = express.Router();

//GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Backlog = mongoose.model('Backlog');
var US = mongoose.model('US');

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
router.get('/backlogs/:backlog', function(req, res) {
  //Using the populate() method, we can automatically load all the USs associated with a particular backlog
  req.backlog.populate('userStories', function(err, backlog) {
    if (err) { return next(err); }

    res.json(backlog);
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

//delete one backlog with associated US
router.delete('/backlogs/:backlog', function(req, res) {
  req.backlog.remove({_id: req.body._id}, function(err, doc) {
    if (err) { return next(err); }
      res.json(doc);
    });
});

module.exports = router;