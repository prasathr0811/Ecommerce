const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

// Create Express app
const app = express();

// Optional: Log request origin for CORS debugging
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// ✅ Enable CORS for your deployed frontend and local dev
app.use(cors({
  origin: [
    "https://shopping-cart-3g9l2doeg-prasath-rs-projects-9756af47.vercel.app", // ✅ your deployed Vercel frontend
    "http://localhost:3000" // ✅ local development
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Middleware to parse incoming JSON
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// ✅ Start server (Render uses dynamic port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
