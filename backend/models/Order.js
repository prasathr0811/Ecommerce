const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,               // Customer full name
  email: String,
  mobile: String,
  age: String,
  address: String,
  productName: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  productImage: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
