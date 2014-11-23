var express = require('express');

var app = module.exports = express();
var Category = require('./category.model');

//TODO: Create Insert, Edit and Delete category engine.

app.get('/api/categories', function (req, res) {
  Business.find({}, function (err, result) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.json(result);
  });
});
