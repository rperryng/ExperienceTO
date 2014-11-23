var express = require('express');

var app = module.exports = express();
var Business = require('./business.model');

app.post('/api/signup/businesses', function (req, res) {
  var business = new Business(req.body);

  business.save(function (err, result) {
    if (err) {
      res.sendStatus(400);
      return;
    }

    res.sendStatus(200);
  });
});

app.get('/api/signup/businesses', function (req, res) {
  Business.find({}, function (err, result) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.json(result);
  });
});
