const Complaint = require('../models/Complaint');

// POST /api/complaints
const fileComplaint = async (req, res) => {
  const { title, description } = req.body;
  try {
    const complaint = await Complaint.create({
      user: req.user._id,
      title,
      description
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add your complaint', error });
  }
};

// GET /api/complaints
const getAllActiveComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: 'active' }).populate('user', 'name email');
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch complaints', error });
  }
};

// PUT /api/complaints/:id/resolve
const resolveComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Complaint.findByIdAndUpdate(id, { status: 'resolved' }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to resolve complaint', error });
  }
};

module.exports = {
  fileComplaint,
  getAllActiveComplaints,
  resolveComplaint
};
