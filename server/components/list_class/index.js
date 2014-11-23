var express = require('express');

var app = module.exports = express();

app.set('views', __dirname);

app.get('/business', function (req, res) {
  res.render('list_class', {
    title: 'Available Classes',
    script_src: '/client/scripts/list_class.js'
  });
});