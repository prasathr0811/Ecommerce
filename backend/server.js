const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

// Create Express app
const app = express();

// ✅ Enable CORS for deployed and local frontend
app.use(cors({
  origin: [
    "https://shopping-cart-prasath-rs-projects-9756af47.vercel.app", // ✅ your actual frontend
    "http://localhost:3000" // ✅ local dev (optional)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🛒 Shopping Cart API is running");
});

// ✅ Start the server (Render uses dynamic port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
