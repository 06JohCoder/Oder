

// const mongoose = require('mongoose');
// Dùng mongoose từ file database.js để đảm bảo cùng kết nối
const { mongoose } = require('../config/database');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  deleted: {
    type: Boolean,
    default: false
  },
  status: { type: String, default: "active" },
  deletedAt: Date,
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;

