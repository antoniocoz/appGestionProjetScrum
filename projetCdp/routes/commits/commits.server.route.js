var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Backlog = mongoose.model('Backlog');
var github = require('octonode');
var client = github.client();

//get one backlog with associated US
router.get('/commits/:backlog/:i', function(req, res) {
    var i=req.params.i;
    var query = {"_id": req.params.backlog};

    Backlog.findOne(query, function(err, doc) {
        if (err) {return (err);}
   
        var ghrepo = client.repo(doc.gitlink);

        //var count = 0;
        //var tmp_data;
       // for (var i = 0; i <= 6; i++) {
            ghrepo.commits(i,30,function(err, data){
                res.json(data);
             //   tmp_data = data.length;
            });   
        //}
       /*
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee"+count);

        ghrepo.commits(1,30,function(err, data){
        	if (err) {return (err);}
            res.json(data);
        });*/  
    });
});

module.exports = router;