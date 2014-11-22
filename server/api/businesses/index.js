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

app.post('/api/signup/businesses/image/:id', function (req, res) {

});
