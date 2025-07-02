const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

// Create Express app
const app = express();

// 🔍 Optional: Log CORS origin
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// ✅ Enable CORS for new Vercel frontend and localhost
app.use(cors({
  origin: [
    "https://shopping-cart-3g9l2doeg-prasath-rs-projects-9756af47.vercel.app", // old vercel frontend
    "https://shopping-cart-ruddy-gamma.vercel.app", // ✅ new frontend (currently active)
    "http://localhost:3000", // local development
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🛒 Shopping Cart API is running");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
