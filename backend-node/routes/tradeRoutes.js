const express = require('express');
const Trade = require('../models/Trade');

const router = express.Router();

// Fetch all trades
router.get('/trades', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).json(trades);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

module.exports = router;