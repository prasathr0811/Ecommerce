const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Route imports
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Use Routes - these must be valid
app.use("/api/auth", authRoutes);   // ✅ Correct
app.use("/api/order", orderRoutes); // ✅ Correct

// Health Check
app.get("/", (req, res) => {
  res.send("🛒 Shopping Cart API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
