const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();

// Define allowed origins
const allowedOrigins = [
  "https://shopping-cart-3g9l2doeg-prasath-rs-projects-9756af47.vercel.app",
  "https://shopping-cart-ruddy-gamma.vercel.app",
  "http://localhost:3000",
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight handling

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🛒 Shopping Cart API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
