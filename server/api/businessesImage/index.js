var express = require('express'),
    multer = require('multer');

var app = module.exports = express();

app.use(multer({
  dest: __dirname + '/images',
  rename: function(fieldname, filename) {
    return filename;
  }
}));

app.post('/api/businesses/images', function (req, res) {
  var newImagePath = '/api/businesses/images/' + req.files.business.originalname;
  res.status(200).send(newImagePath);
});

app.use('/api/businesses/images', express.static(__dirname + '/images'));
