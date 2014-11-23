var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebook_user_id: {
    type: Number,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true,
    unique: false
  },
  class_ids: {
    type: [Number],
    required: false,
    unique: false
  }
});

module.exports = mongoose.model('User', userSchema);