const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  district: String,
  ward: String,
  phone: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, 
  status: { type: String, default: 'active' },
  role: { type: String, default: 'user' },
  deleted: { type: Boolean, default: false },
  deletedAt: Date,
  address: AddressSchema,
  // addresses: [AddressSchema],
}, { timestamps: true });

const userAccount = mongoose.model('userAccount', userSchema , "userAccounts")

module.exports = userAccount;