var mongoose = require('mongoose');

var BusinessSchema = mongoose.Schema({
  id: Number,
  name: String,
  logo: String,
  location: Float,
  description: String
});

module.exports = BusinessSchema.model('Business', BusinessSchema);

// route file

var Business = require('./business.model.js');

app.post('/api/business', function(req, res) {
  var business = new Busines(req.body);


});

app.get('/api/business', function (req, res) {
  Business.find()
})
