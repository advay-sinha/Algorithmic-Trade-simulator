const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    otp: String,
    otpExpires: Date
});

module.exports = mongoose.model('User', UserSchema);
