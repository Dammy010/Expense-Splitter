const express = require('express');
const router = express.Router();
const {
  viewShares,
  settleShare,
  getHistory,
} = require('../controllers/shareController');

router.get('/view/:name', viewShares);

router.post('/settle', settleShare);
router.get('/history/:name', getHistory);

module.exports = router;
