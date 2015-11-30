var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Backlog = mongoose.model('Backlog');
var github = require('octonode');
var client = github.client();

//get one backlog with associated US
router.get('/commits/:backlog', function(req, res) {
    var query = {"_id": req.params.backlog};

    Backlog.findOne(query, function(err, doc) {
        if (err) {return (err);}
   
        var ghrepo = client.repo(doc.gitlink);
        ghrepo.commits(0,20,function(err, data){
        	if (err) {return (err);}
            res.json(data);
        });   
    });
});

module.exports = router;