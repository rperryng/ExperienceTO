var express = require('express');

var app = module.exports = express();
var User = require('./user.model');
var Class = require('../classes/class.model');

app.post('/api/signup/user', function (req, res) {
  req.body.facebook_user_id = req.body.id;
  delete req.body.id;

  var user = new User(req.body);

  user.save(function (err, result) {
    if (err && err.code != "11000") {
      //11000 duplicated id code - user already logged in.
      res.sendStatus(400);
      return;
    }

  res.sendStatus(200);
  });
});

app.get('/api/user/:id', function (req, res) {
  var id = req.param('id');

  User.findOne({'facebook_user_id': req.params.id}).exec(function (err, user) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.status(200).json(user);
  });
});

app.put('/api/user/:userId/:classId', function(req, res) {
  var userId = req.param('userId');
  var classId = req.param('classId');

  User.findOne({'facebook_user_id': userId})
    .exec(function (err, user) {
      if (err) {
        res.status(400).send('No user with id', userId);
        return;
      }

      if (user.class_ids.indexOf(classId) !== -1) {
        res.status(400).send('User ' + userId + ' already has class with id ' + classId);
        return;
      }

      user.class_ids.push(classId);
      user.save(onNewUserClass);
    });

  function onNewUserClass(err, result) {
    if (error) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  }
});
