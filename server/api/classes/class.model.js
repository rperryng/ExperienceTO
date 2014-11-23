var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true,
    unique: false
  },
  class_logo: {
    type: String,
    required: false,
    unique: false
  },
  duration: {
    type: String,
    required: true,
    unique: false
  },
  start_date: { 
    type: Date,
    required: true,
    unique: false
  },
  end_date: { 
    type: Date,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model('Class', classSchema);