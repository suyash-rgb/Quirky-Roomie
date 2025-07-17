// controllers/flatController.js
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getFlatStats = async (req, res) => {
  const { flatCode } = req.query;

  if (!flatCode) {
    return res.status(400).json({ success: false, message: 'flatCode is required' });
  }

  try {
    const totalComplaints = await Complaint.countDocuments({
      user: { $in: await User.find({ flatCode }).distinct('_id') }
    });

    const resolvedComplaints = await Complaint.countDocuments({
      user: { $in: await User.find({ flatCode }).distinct('_id') },
      status: 'resolved'
    });

    const topUsers = await User.find({ flatCode })
      .sort({ karma: -1 })
      .limit(5)
      .select('name karma');

    const commonTitles = await Complaint.aggregate([
      {
        $match: {
          user: { $in: await User.find({ flatCode }).distinct('_id') }
        }
      },
      {
        $group: {
          _id: '$title',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      flatCode,
      totalComplaints,
      resolvedComplaints,
      topUsers,
      commonComplaintTitles: commonTitles
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
