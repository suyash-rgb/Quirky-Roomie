const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, flatCode } = req.body;

  console.log("📥 Incoming signup request:", req.body);

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed, flatCode });
    console.log("✅ User created:", user);

    res.status(201).json({ msg: 'Registered successfully' });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ msg: err.message });
  }
};
 
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, flatCode: user.flatCode } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { register, login };
