const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// ✅ POST /api/order/place
router.post("/place", async (req, res) => {
  const { user, product } = req.body;

  try {
    // ✅ Basic validation
    if (!user || !product) {
      return res.status(400).json({ error: "User and product data are required" });
    }

    // ✅ Save order to MongoDB
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

    console.log("✅ Order saved to MongoDB");
    console.log("Order Summary:");
    console.log(`Customer Name : ${user.name}`);
    console.log(`Email         : ${user.email}`);
    console.log(`Mobile        : ${user.mobile}`);
    console.log(`Address       : ${user.address}`);
    console.log(`Product       : ${product.name}`);
    console.log(`Quantity      : ${product.quantity || 1}`);
    console.log(`Price         : ₹${product.price}`);
    console.log(`Order Time    : ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`);

    // ✅ Setup mail transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email HTML content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif;">
        <h2>✅ Order Confirmation</h2>
        <div style="text-align: center;">
          <img src="${product.image}" alt="${product.name}" style="max-width: 250px; border-radius: 10px;" />
          <p style="font-weight: bold;">${product.name}</p>
        </div>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Mobile:</strong> ${user.mobile}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Product Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Quantity:</strong> ${product.quantity || 1}</p>
        <p><strong>Order Time:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        <p>Thanks for shopping with <strong>Shopping Cart</strong>!</p>
      </div>
    `;

    // ✅ Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [user.email, process.env.ADMIN_EMAIL || process.env.EMAIL_USER],
      subject: "✅ Order Placed Successfully",
      html: emailHTML,
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
    console.error("❌ Order failed:", error.message);
    res.status(500).json({ error: "Internal server error: " + error.message });
  }
});

module.exports = router;
