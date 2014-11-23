var express = require('express');

var app = module.exports = express();

app.set('views', __dirname);

app.get('/business', function (req, res) {
  res.render('list_class', {
    title: 'Available Classes',
    script_src: '/client/scripts/list_class.js'
  });
});

app.get('/business/class/:id', function (req, res) {
  res.render('checkout_user_class', {
  	id: req.params.id,
    title: 'Checkout user in class',
    script_src: '/client/scripts/checkout_user_class.js'
  });
});