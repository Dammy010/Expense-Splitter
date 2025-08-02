const express = require('express');
const router = express.Router();
const {
  addBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
} = require('../controllers/billController');

router.get('/', getAllBills);
router.get('/:id', getBillById); 
router.post('/', addBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

module.exports = router;
