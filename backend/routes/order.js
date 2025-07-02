const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// POST /api/order
router.post("/", async (req, res) => {
  const { user, product } = req.body;

  try {
    // ✅ Save to MongoDB with correct field names
    const order = new Order({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      age: user.age,
      address: user.address,
      productName: product.name,
      price: product.price,
      quantity: product.quantity || 1,
      productImage: product.image || "",
    });

    await order.save();

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [user.email, process.env.ADMIN_EMAIL || process.env.EMAIL_USER],
      subject: "✅ Order Placed Successfully",
      text: emailBody,
    };

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
