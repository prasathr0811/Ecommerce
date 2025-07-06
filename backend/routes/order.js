const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// POST /api/order
router.post("/", async (req, res) => {
  const { user, product } = req.body;

  try {
    // ✅ Save to MongoDB
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

    // ✅ Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ HTML email with image
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>✅ Order Confirmation</h2>

        <img src="${product.image}" alt="${product.name}" style="max-width: 300px; border-radius: 10px; margin: 15px 0;" />

        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Mobile:</strong> ${user.mobile}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Address:</strong> ${user.address}</p>

        <hr style="margin: 15px 0;" />

        <p><strong>Product:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ₹${product.price}</p>
        <p><strong>Quantity:</strong> ${product.quantity || 1}</p>

        <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [user.email, process.env.ADMIN_EMAIL || process.env.EMAIL_USER],
      subject: "✅ Order Placed Successfully",
      html: emailHTML, // ✅ changed from `text:` to `html:`
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
