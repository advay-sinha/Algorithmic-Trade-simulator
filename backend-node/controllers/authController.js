const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilioService = require('../services/twilioService');

exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({ name, email, phone, password: hashedPassword });
    await user.save();
    
    res.json({ message: "User registered successfully!" });
};

exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found!" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 300000; // OTP valid for 5 min
    await user.save();

    await twilioService.sendOTP(user.phone, otp);
    res.json({ message: "OTP sent successfully!" });
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ message: "Invalid OTP!" });
    }

    user.otp = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ message: "OTP verified!", token });
};