var express = require('express');

var app = module.exports = express();

app.set('views', __dirname);

app.get('/signup/business', function (req, res) {
  res.render('signup_business', {
    title: 'Signup',
    script_src: '/client/scripts/signup_business.js'
  });
});
