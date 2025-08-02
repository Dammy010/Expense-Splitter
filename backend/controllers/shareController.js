const ShareModel = require('../models/Share');

const normalize = (str) => str?.trim().toLowerCase();

exports.viewShares = async (req, res) => {
  const name = normalize(req.params.name);
  try {
    const youOwe = await ShareModel.find({ from: name, isSettled: false });
    const owedToYou = await ShareModel.find({ to: name, isSettled: false });

    res.status(200).json({
      name,
      youOwe: youOwe.map((s) => ({
        to: s.to,
        amount: s.amount,
        createdAt: s.createdAt,
      })),
      owedToYou: owedToYou.map((s) => ({
        from: s.from,
        amount: s.amount,
        createdAt: s.createdAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.settleShare = async (req, res) => {
  const from = normalize(req.body.from);
  const to = normalize(req.body.to);
  const amount = parseFloat(req.body.amount);

  try {
    const shares = await ShareModel.find({ from, to, isSettled: false }).sort({ _id: 1 });
    let remaining = amount;
    let settledRecords = [];

    for (let share of shares) {
      if (remaining === 0) break;

      if (remaining >= share.amount) {
        remaining -= share.amount;
        share.isSettled = true;
        await share.save();
        settledRecords.push({ id: share._id, settledAmount: share.amount });
      } else {
        share.amount -= remaining;
        await share.save();
        settledRecords.push({ id: share._id, settledAmount: remaining });
        remaining = 0;
        break;
      }
    }

    res.status(200).json({
      message: 'Settled successfully.',
      totalSettled: amount - remaining,
      settledRecords,
      remainingUnsettled: remaining,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHistory = async (req, res) => {
  const name = normalize(req.params.name);
  if (!name) {
    return res.status(400).json({ message: 'Name parameter is required.' });
  }

  try {
    const history = await ShareModel.find({
      $or: [{ from: name }, { to: name }],
    }).sort({ createdAt: -1 });

    const formatted = history.map((entry) => ({
      from: entry.from,
      to: entry.to,
      amount: entry.amount,
      isSettled: entry.isSettled,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt,
    }));

    res.status(200).json({
      name,
      totalRecords: formatted.length,
      history: formatted,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history.', error: err.message });
  }
};
