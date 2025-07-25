require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes'); 
const userRoutes = require('./routes/userRoutes');
const flatRoutes = require('./routes/flatRoutes');

const cors = require('cors');


const app = express(); 
connectDB();

app.use(cors());
app.use(express.json());
app.use(
  helmet({ // helps secure the app by setting various HTTP headers.
    contentSecurityPolicy: false, // disable CSP if serving inline scripts
  })
);


app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', flatRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
