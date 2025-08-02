const Bill = require('../models/Bill');
const ShareModel = require('../models/Share');

// CREATE Bill
const addBill = async (req, res) => {
  try {
    const { paidBy, amount, participants, description } = req.body;

    const bill = new Bill({ paidBy, amount, participants, description });
    await bill.save();

    const payer = paidBy.toLowerCase().trim();
    const normalizedParticipants = participants.map((p) => p.toLowerCase().trim());
    const shareAmount = amount / normalizedParticipants.length;

    const sharesToCreate = normalizedParticipants
      .filter((p) => p !== payer)
      .map((participant) => ({
        from: participant,
        to: payer,
        amount: shareAmount,
        billId: bill._id,
        isSettled: false,
      }));

    await ShareModel.insertMany(sharesToCreate);

    res.status(201).json({ message: 'Bill and shares added successfully.' });
  } catch (err) {
    console.error('Error adding bill:', err);
    res.status(500).json({ error: 'Failed to add bill and shares.' });
  }
};

// READ All Bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bills.' });
  }
};

// READ Single Bill
const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({ error: 'Bill not found.' });
    }
    res.json(bill);
  } catch (err) {
    console.error('Error fetching bill by ID:', err);
    res.status(500).json({ error: 'Failed to fetch bill.' });
  }
};

// UPDATE a Bill by ID
const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const { paidBy, amount, participants, description } = req.body;

    // Delete existing shares related to this bill
    await ShareModel.deleteMany({ billId: id });

    // Update the bill
    const updatedBill = await Bill.findByIdAndUpdate(
      id,
      { paidBy, amount, participants, description },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ error: 'Bill not found.' });
    }

    // Recalculate and recreate shares
    const payer = paidBy.toLowerCase().trim();
    const normalizedParticipants = participants.map((p) => p.toLowerCase().trim());
    const shareAmount = amount / normalizedParticipants.length;

    const sharesToCreate = normalizedParticipants
      .filter((p) => p !== payer)
      .map((participant) => ({
        from: participant,
        to: payer,
        amount: shareAmount,
        billId: updatedBill._id,
        isSettled: false,
      }));

    await ShareModel.insertMany(sharesToCreate);

    res.json({ message: 'Bill and shares updated successfully.', bill: updatedBill });
  } catch (err) {
    console.error('Error updating bill:', err);
    res.status(500).json({ error: 'Failed to update bill.' });
  }
};

// DELETE a Bill by ID
const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBill = await Bill.findByIdAndDelete(id);
    if (!deletedBill) {
      return res.status(404).json({ error: 'Bill not found.' });
    }

    // Delete related shares
    await ShareModel.deleteMany({ billId: id });

    res.json({ message: 'Bill and related shares deleted successfully.' });
  } catch (err) {
    console.error('Error deleting bill:', err);
    res.status(500).json({ error: 'Failed to delete bill.' });
  }
};

module.exports = {
  addBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
};
