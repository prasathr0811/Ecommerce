const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// ✅ Import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();

// ✅ Define allowed frontend origins (Vercel + Localhost)
const allowedOrigins = [
  "https://shopping-cart-3g9l2doeg-prasath-rs-projects-9756af47.vercel.app", // old vercel
  "https://shopping-cart-ruddy-gamma.vercel.app", // current vercel
  "http://localhost:3000", // local dev
];

// ✅ CORS config
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

// ✅ Enable CORS for all routes
app.use(cors(corsOptions));

// ✅ Handle preflight requests
app.options("*", cors(corsOptions));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes); // ✅ DO NOT use colon (:) unless defining a param like /order/:id

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🛒 Shopping Cart API is running");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
