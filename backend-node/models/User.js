const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String },
});

module.exports = mongoose.model('User', UserSchema);