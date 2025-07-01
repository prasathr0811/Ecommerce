const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Register route
router.post("/register", async (req, res) => {
  const { name, username, email, password, mobile, age, address } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "Username already exists" });

    const newUser = new User({
      name,
      username,
      email,
      password,
      mobile,
      age,
      address,
    });

    await newUser.save();
    console.log("✅ Registered user:", newUser);
    res.status(201).json(newUser); // Send user back
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// ✅ Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    console.log("✅ Logged in:", user.username);
    res.json(user);
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// ✅ Update profile route
router.put("/update", async (req, res) => {
  const { _id, name, username, email, mobile, age, address } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, username, email, mobile, age, address },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    console.log("✅ Profile updated:", updatedUser.username);
    res.json({ updatedUser });
  } catch (err) {
    console.error("❌ Profile update error:", err.message);
    res.status(500).json({ error: "Failed to update profile: " + err.message });
  }
});

module.exports = router;
