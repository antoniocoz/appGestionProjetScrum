var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Backlog = mongoose.model('Backlog');

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
  var gitlink = req.body.gitlink;
  
  var query = {"_id":req.backlog._id};
  Backlog.findOneAndUpdate(query, {title: title, description: description, gitlink: gitlink}, { 'new': true }, function(doc) {
    res.json(doc);
  });
});


//delete one backlog with associated US
router.delete('/backlogs/:backlog', function(req, res) {
  Backlog.remove({_id: req.params.backlog}, function(err, doc) {
    if (err) { return next(err); }
      res.json(doc);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Backlog = mongoose.model('Backlog');

//Get all backlogs
router.get('/backlogs', function(req, res, next) {
    Backlog.find(function(err, backlogs) {
        if (err) {
            return next(err);
        }

        res.json(backlogs);
    });
});

router.post('/backlogs', function(req, res, next) {
    var backlog = new Backlog(req.body);

    backlog.save(function(err, backlog) {
        if (err) {
            return next(err);
        }
        res.json(backlog);
    });
});

router.param('backlog', function(req, res, next, id) {
    var query = Backlog.findById(id);

    query.exec(function(err, backlog) {
        if (err) {
            return next(err);
        }
        if (!backlog) {
            return next(new Error('can\'t find backlog'));
        }

        req.backlog = backlog;
        return next();
    });
});

//get one backlog with associated US
router.get('/backlogs/:backlog', function(req, res) {
    var query = {
        "_id": req.backlog._id
    };
    Backlog.findOne(query, function(err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
});

//update one backlog with associated US
router.put('/backlogs/:backlog', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var gitlink = req.body.gitlink;

    var query = {
        "_id": req.backlog._id
    };
    Backlog.findOneAndUpdate(query, {
        title: title,
        description: description,
        gitlink: gitlink
    }, {
        'new': true
    }, function(doc) {
        res.json(doc);
    });
});


//delete one backlog with associated US
router.delete('/backlogs/:backlog', function(req, res) {
    Backlog.remove({
        _id: req.params.backlog
    }, function(err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
});

module.exports = router;