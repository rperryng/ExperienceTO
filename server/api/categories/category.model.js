var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Category', categorySchema);
