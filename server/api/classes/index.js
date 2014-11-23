var express = require('express');

var app = module.exports = express();
var Class = require('./class.model');

app.get('/api/business/classes', function (req, res) {
	Class.find({}).limit(5).exec(function (err, classes) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		res.status(200).json(classes);
	});
});