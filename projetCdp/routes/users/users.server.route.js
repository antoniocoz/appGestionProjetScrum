var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/users/:backlog', function(req, res) {
    var query = {
        "backlog": req.params.backlog
    };
    User.find(query, function(err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
});

router.post('/users', function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

router.delete('/users/:user', function(req, res) {
    User.remove({
        _id: req.params.user
    }, function(err, doc) {
        if (err) {
            return next(err);
        }
        res.json(doc);
    });
});

router.put('/users/:user', function(req, res) {
    var forename = req.body.forename;
    var surname = req.body.surname;
    var contact = req.body.contact;

    var query = {
        "_id": req.params.user
    };

    User.findOneAndUpdate(query, {
        forename: forename,
        surname: surname,
        contact: contact
    }, {
        'new': true
    }, function(doc) {
        res.json(doc);
    });
});

module.exports = router;