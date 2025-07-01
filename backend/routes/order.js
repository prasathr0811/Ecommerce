const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// POST /api/order/place
router.post("/place", async (req, res) => {
  const { user, product } = req.body;

  try {
    // ✅ Save to MongoDB
    const order = new Order({
      username: user.name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image || "",
      quantity: product.quantity || 1, // ✅ New
    });

    await order.save();

    // ✅ Console log
    console.log("✅ Order placed:");
    console.log({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      age: user.age,
      address: user.address,
      product: product.name,
      price: `₹${product.price}`,
      quantity: product.quantity || 1,
    });

    // ✅ Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email body
    const emailBody = `
✅ Order Confirmation

Name: ${user.name}
Email: ${user.email}
Mobile: ${user.mobile}
Age: ${user.age}
Address: ${user.address}

Product: ${product.name}
Price: ₹${product.price}
Quantity: ${product.quantity || 1}

Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
`;

    // ✅ Send to both user and admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [user.email, process.env.ADMIN_EMAIL || process.env.EMAIL_USER],
      subject: "✅ Order Placed Successfully",
      text: emailBody,
    };

    // ✅ Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Email send failed:", err.message);
        return res.status(200).json({
          message: "Order placed, but email failed.",
          emailSent: false,
        });
      } else {
        console.log("✅ Email sent:", info.response);
        return res.status(200).json({
          message: "Order placed and email sent successfully!",
          emailSent: true,
        });
      }
    });
  } catch (error) {
    console.error("❌ Order placement failed:", error.message);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

module.exports = router;


