var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebook_user_id: Number,
  class_ids: [Number]
});
