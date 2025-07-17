const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generatePunishment(complaintTitle) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
    Suggest a funny but light-hearted punishment for the following flatmate complaint:
    "${complaintTitle}"

    Examples:
    - Didn’t clean the dishes? You’re making chai for everyone for a week.
    - Blasted loud music at 2 AM? You owe everyone samosas.

    Your response should be a **single-line punishment only**, nothing else.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return text.trim();
  } catch (err) {
    console.error("Gemini Error:", err.message);
    return null;
  }
}

module.exports = { generatePunishment };

