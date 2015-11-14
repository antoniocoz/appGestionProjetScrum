
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tache = mongoose.model('Tache');

router.get('/taches/:usId', function(req, res) {
    var query = {"usId": req.params.usId};
    Tache.find(query, function(err, taches) {
      if (err) { return next(err); }
        res.json(taches);
    });
});

router.get('/tache/:tacheId', function(req, res) {
    var query = {"_id": req.params.tacheId};
    Tache.findOne(query, function(err, doc) {
      if (err) { return next(err); }
        res.json(doc);
    });
});

router.post('/taches', function(req, res, next) {
  var tache = new Tache(req.body);
  
  tache.save(function(err, tache){
    if(err){ return next(err); }
    res.json(tache);
  });
});

router.delete('/taches/:tacheId', function(req, res) {
	Tache.remove({_id: req.params.tacheId}, function(err, tache) {
    if (err) { return next(err); }
      res.json(tache);
    });
});

//update one US
router.put('/taches/:tacheId', function(req, res) {
  var numero = req.body.numero;
  var description = req.body.description;
  var dure =req.body.dure
  var query = {"_id":req.params.tacheId};
  Tache.findOneAndUpdate(query, {numero: numero, description:description, 
                                 dure:dure}, 
                                 { 'new': true }, 
                                 function(doc) {
        res.json(doc);  
  });
});
module.exports = router;