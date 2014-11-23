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

app.get('/api/business/class/:id/:userCode', function (req, res) {
	var id = req.params['id'];
	var userCode = req.params['userCode'];

	//TODO:
	//In the future this code should consider:
	//- Is valid month?
	//- Is ticket never used?
	//- User and Class have valid code?
	Class.findOne({_id: id}).exec(function (err, classObject) {
		if (err) {
			res.sendStatus(500);
			return;
		}
		res.status(200).json(classObject);
	});
});