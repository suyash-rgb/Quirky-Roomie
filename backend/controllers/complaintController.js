const Complaint = require('../models/Complaint');
const User = require('../models/User');

// POST /api/complaints  
const fileComplaint = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Fetch the user's flatCode
    const user = await User.findById(req.user._id);
    if (!user) {
      console.error('User not found for ID:', req.user._id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the complaint with user and flatCode
    const complaint = await Complaint.create({
      user: req.user._id,
      flatCode: user.flatCode,
      title,
      description
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error('Error while filing complaint:', error);
    res.status(500).json({ message: 'Failed to add your complaint', error });
  
    // Including more specific message if validation error
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors
      });
    }

    // fallback
    res.status(500).json({
      message: 'Failed to add your complaint',
      error: error.message || error
    });
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
  const resolverId = req.user._id;

  try {
    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status: 'resolved' },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Complaint not found' });

    // 💥 Reward resolver with karma
    await User.findByIdAndUpdate(resolverId, { $inc: { karma: 3 } });

    res.status(200).json(updated);
  } catch (error) {
    console.error('Resolve error:', error);
    res.status(500).json({ message: 'Failed to resolve complaint', error });
  }
};


// PUT /api/complaints/:id/vote
const voteComplaint = async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body;
  const voterId = req.user._id;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    // Ensure vote arrays exist
    if (!Array.isArray(complaint.upvotedBy)) complaint.upvotedBy = [];
    if (!Array.isArray(complaint.downvotedBy)) complaint.downvotedBy = [];

    const hasUpvoted = complaint.upvotedBy.includes(voterId);
    const hasDownvoted = complaint.downvotedBy.includes(voterId);

    // Block double voting or switching without neutralizing first
    if (voteType === 'upvote') {
      if (hasUpvoted || hasDownvoted)
        return res.status(400).json({ message: 'You’ve already voted. Remove your vote before changing.' });

      complaint.upvotedBy.push(voterId);
      complaint.votes += 1;

      await User.findByIdAndUpdate(complaint.user, { $inc: { karma: 1 } });

    } else if (voteType === 'downvote') {
      if (hasDownvoted || hasUpvoted)
        return res.status(400).json({ message: 'You’ve already voted. Remove your vote before changing.' });

      complaint.downvotedBy.push(voterId);
      complaint.votes -= 1;

    } else {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    await complaint.save();

    return res.status(200).json({
      message: 'Vote registered',
      votes: complaint.votes,
      upvotedBy: complaint.upvotedBy.length,
      downvotedBy: complaint.downvotedBy.length
    });

  } catch (err) {
    console.error('Vote error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// GET /api/complaints/trending
const getTrendingComplaints = async (req, res) => {
  try {
    const trending = await Complaint.find({ status: 'active' })
      .sort({ votes: -1 })
      .limit(10); // You can change limit as needed

    res.status(200).json(trending);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  fileComplaint,
  getAllActiveComplaints,
  resolveComplaint,
  voteComplaint,
  getTrendingComplaints,
};
