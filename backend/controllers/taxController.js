const Tax = require('../models/Tax');

// CREATE TAX
exports.createTax = async (req, res) => {
  try {
    const { type, amount, dueDate } = req.body;

    const tax = new Tax({
      user: req.user.id, // 🔥 IMPORTANT
      type,
      amount,
      dueDate,
      status: "pending",
    });

    const saved = await tax.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

