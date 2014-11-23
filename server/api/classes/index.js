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

app.get('/api/business/class/:id/usercode/:userCode', function (req, res) {
	var id = req.params['id'];
	var userCode = req.params['userCode'];

	Class.findOne({id: id}).exec(function (err, classObject) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		res.status(200).json(classObject);
	});
});