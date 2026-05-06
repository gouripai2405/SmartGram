const Complaint = require('../models/Complaint');

// GET all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// CREATE complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newComplaint = new Complaint({
      title,
      description,
      category,
      status: "open",
    });

    const saved = await newComplaint.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};