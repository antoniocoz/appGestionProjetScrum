var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Backlog = mongoose.model('Backlog');

//get one backlog with associated US
router.get('/commits/:id', function(req, res) {
    var query = {"_id": req.id._id};
    Backlog.findOne(query, function(err, doc) {
      if (err) { return next(err); }
        res.json(doc);
    });
});

module.exports = router;