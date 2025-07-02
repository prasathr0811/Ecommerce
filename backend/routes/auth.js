const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { name, username, email, password, mobile, age, address } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "Username already exists" });

    const newUser = new User({ name, username, email, password, mobile, age, address });
    await newUser.save();

    console.log("✅ Registered user:", newUser.username);
    res.status(201).json(newUser); // Send user object back
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username, password });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    console.log("✅ Logged in:", user.username);
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// ✅ UPDATE PROFILE
router.put("/update", async (req, res) => {
  const { _id, name, username, email, mobile, age, address } = req.body;

  try {
    if (!_id) return res.status(400).json({ error: "User ID is required" });

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, username, email, mobile, age, address },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    console.log("✅ Profile updated:", updatedUser.username);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("❌ Profile update error:", err.message);
    res.status(500).json({ error: "Failed to update profile: " + err.message });
  }
});

module.exports = router;

