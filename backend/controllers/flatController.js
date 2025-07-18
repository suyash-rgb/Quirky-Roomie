const Complaint = require('../models/Complaint');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getFlatStats = async (req, res) => {
  const { flatCode } = req.query;

  if (!flatCode) {
    return res.status(400).json({
      success: false,
      message: 'flatCode is required'
    });
  }

  try {
    //Find all user IDs belonging to the flat
    const userIds = await User.find({ flatCode }).distinct('_id');

    if (!userIds.length) {
      return res.status(404).json({
        success: false,
        message: `No users found for flatCode '${flatCode}'`
      });
    }

    //Count total and resolved complaints
    const totalComplaints = await Complaint.countDocuments({
      user: { $in: userIds }
    });

    const resolvedComplaints = await Complaint.countDocuments({
      user: { $in: userIds },
      status: 'resolved'
    });

    // Fetch top users by karma
    const topUsers = await User.find({ flatCode })
      .sort({ karma: -1 })
      .limit(5)
      .select('name karma');

    //finding common complaint titles
    const commonTitles = await Complaint.aggregate([
      {
        $match: {
          user: { $in: userIds }
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

    // Respond with aggregated stats
    res.status(200).json({
      success: true,
      flatCode,
      totalComplaints,
      resolvedComplaints,
      topUsers,
      commonComplaintTitles: commonTitles
    });

  } catch (error) {
    console.error('Error in getFlatStats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};