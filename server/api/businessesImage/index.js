var express = require('express'),
    multer = require('multer');

var app = module.exports = express();

app.use(multer({
  dest: __dirname + '/images'
}));

app.post('/api/businesses/image', function (req, res) {
  var statusCode = req.files.file.path ? 200 : 500;
  res.sendStatus(statusCode);
});
