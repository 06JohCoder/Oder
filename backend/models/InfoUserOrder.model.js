const mongoose = require('mongoose');


const infoUserOrder = new mongoose.Schema({
  date: Date,
  customerName: String,
  phone: String,
  shippingFee: Number,
  discount: Number,
  total: Number,
  status: String,
  trackingCode: String,
  shippingUnit: String,
  note: String
});



const infoOrder = mongoose.model('exportInfoOrder', infoUserOrder , "exportInfoOrder")

module.exports = infoOrder;
