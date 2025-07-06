const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Allow Vercel frontend URLs + local dev
const allowedOrigins = [
  "http://localhost:3000",
  "https://shopping-cart-ruddy-gamma.vercel.app",  // your live frontend
  "https://shopping-cart-3g9l2doeg-prasath-rs-projects-9756af47.vercel.app", // optional second Vercel URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🛒 Shopping Cart Backend is running.");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
