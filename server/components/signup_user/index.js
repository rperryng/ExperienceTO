var express = require('express');

var app = module.exports = express();

app.set('views', __dirname);

app.get('/signup/user', function (req, res) {
  res.render('signup_user');
});

