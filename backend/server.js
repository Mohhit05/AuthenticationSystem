// server.js
require('dotenv').config(); // Load environment variables first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware for CORS
app.use(cors({
  origin: "https://authentication-system-nu-seven.vercel.app",
  credentials: true,
}));

app.use(express.json()); // Body parser for JSON requests

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes (will be added soon)
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('Authentication System API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});