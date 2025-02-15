const express = require('express');
const User = require('../models/User');
const twilioService = require('../services/twilioService');

const router = express.Router();

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    // Save or update user with OTP in MongoDB
    await User.findOneAndUpdate(
      { phone },
      { otp },
      { upsert: true, new: true }
    );

    // Send OTP via Twilio
    await twilioService.sendOTP(phone, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.otp === otp) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

module.exports = router;