const cron = require("node-cron");
const Complaint = require("../models/Complaint");
const User = require("../models/User");

cron.schedule("0 0 1 * *", async () => {
  console.log("Running karma evaluation job...");

  try {
    const resolvedComplaints = await Complaint.find({ status: "resolved" });

    const karmaMap = {};

    resolvedComplaints.forEach(c => {
      const userId = c.resolvedBy?.toString();
      if (!userId) return;

      karmaMap[userId] = (karmaMap[userId] || 0) + 10;
    });

    // Update users with karma points
    for (const userId in karmaMap) {
      await User.findByIdAndUpdate(userId, { $inc: { karma: karmaMap[userId] } });
    }

    // Identify top flatmate
    const users = await User.find().sort({ karma: -1 }).limit(1);
    if (users.length > 0) {
      const topUser = users[0];
      topUser.badges = [...(topUser.badges || []), "Best Flatmate - " + new Date().toLocaleDateString()];
      await topUser.save();
    }

    console.log("Karma evaluation complete.");
  } catch (error) {
    console.error("Karma job failed:", error.message);
  }
});
