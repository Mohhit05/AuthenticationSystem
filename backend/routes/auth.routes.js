// routes/auth.routes.js
const express = require("express");
const {
  register,
  login,
  getProfile,
  forgotPassword, // Import new functions
  resetPassword, // Import new functions
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post('/forgot-password', forgotPassword); // New route
router.put('/reset-password/:token', resetPassword); // New route with token param

router.get("/profile", protect, getProfile); // Example of a protected route

module.exports = router;
