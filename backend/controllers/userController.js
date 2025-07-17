const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .sort({ karma: -1 })
      .select('name karma flatCode');

    res.json({ success: true, leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
