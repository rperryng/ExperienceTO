var express = require('express');

var app = module.exports = express();
var User = require('./user.model');

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