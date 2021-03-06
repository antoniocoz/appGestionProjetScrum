var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tache = mongoose.model('Tache');
var US = mongoose.model('US');

router.get('/tachesBySprints/:spId', function(req, res) {
    var query = {
        "sprint": req.params.spId
    };
    US.find(query, function(err, us) {
        if (err) {
            return next(err);
        }
        var spIds = [];
        for (var i = 0; i < us.length; i++) {
            spIds[i] = us[i]._id;
        }
        var query = {
            "usId": {
                $in: spIds
            }
        };
        Tache.find(query, function(err, taches) {
            if (err) {
                return next(err);
            }
            res.json(taches);
        });
    });
});

router.get('/taches/:usId', function(req, res) {
    var query = {
        "usId": req.params.usId
    };
    Tache.find(query, function(err, taches) {
        if (err) {
            return next(err);
        }
        res.json(taches);
    });
});

router.get('/tache/:tacheId', function(req, res) {
    var query = {
        "_id": req.params.tacheId
    };
    Tache.findOne(query, function(err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
});

router.post('/taches', function(req, res, next) {
    var tache = new Tache(req.body);
    tache.save(function(err, tache) {
        if (err) {
            return next(err);
        }
        res.json(tache);
    });
});

router.delete('/taches/:tacheId', function(req, res) {
    Tache.remove({
        _id: req.params.tacheId
    }, function(err, tache) {
        if (err) {
            return next(err);
        }
        res.json(tache);
    });
});

//update one US
router.put('/taches/:tacheId', function(req, res) {
    var numero = req.body.numero;
    var description = req.body.description;
    var dure = req.body.dure;
    var etat = req.body.etat;
    var tacheId = req.body.tacheId;
    var delaiplustot = req.body.delaiplustot;
    var delaiplustard = req.body.delaiplustard;
    var query = {
        "_id": req.params.tacheId
    };
    Tache.findOneAndUpdate(query, {
            numero: numero,
            description: description,
            dure: dure,
            etat: etat,
            tacheId: tacheId,
            delaiplustot: delaiplustot,
            delaiplustard: delaiplustard
        }, {
            'new': true
        },
        function(doc) {
            res.json(doc);
        });
});


router.put('/tachesUpdate/:tacheId', function(req, res) {
    var tache=req.body;
    var query = {
        "_id": tache._id
    };
    Tache.findOneAndUpdate(query, tache, {
        'new': true
    },
    function(doc) {
        res.json(doc);
    });
});

module.exports = router;