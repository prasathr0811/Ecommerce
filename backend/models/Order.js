const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Customer full name
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  productImage: {
    type: String,
    required: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
