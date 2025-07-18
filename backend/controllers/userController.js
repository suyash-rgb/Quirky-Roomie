const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    // Fetch top 10 users sorted by descending karma
    const leaderboard = await User.find({})
      .sort({ karma: -1 })
      .limit(10)
      .select('name karma flatCode');

    console.log('[Leaderboard] Top 10 fetched');

    res.status(200).json({ success: true, leaderboard });
  } catch (err) {
    console.error('[ Leaderboard Error]', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};