require('dotenv').config();
const { generatePunishment } = require('./automatedPunishmentGenerator');

(async () => {
  const testComplaintTitle = "Left trash in the hallway again!";
  const punishment = await generatePunishment(testComplaintTitle);
  console.log('Generated Punishment:', punishment);
})();
