
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var US = mongoose.model('US');
var Tache = mongoose.model('Tache');

router.get('/users/:backlog', function(req, res) {
    var query = {"backlog": req.params.backlog};
    User.find(query, function(err, doc) {
      if (err) { return next(err); }
        res.json(doc);
    });
});

router.get('/tachesBySprints/:spId', function(req, res) {
    //console.log(req.params.spId);
    var query = {"sprint": req.params.spId};
    US.find(query, function(err, us) {
      if (err) { return next(err); }
        var spIds=[];
        //console.log(doc);
        for(var i=0;i<us.length;i++){
           spIds[i]=us[i]._id;
        }
        //console.log(spIds);
        var query = {"usId": { $in: spIds } };
        Tache.find(query, function(err, taches) {
          if (err) { return next(err); }
            //console.log(taches); 
            res.json(taches);
        });
    });
});

module.exports = router;