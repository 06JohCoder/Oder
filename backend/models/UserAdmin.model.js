// const mongoose = require('mongoose');
const { mongoose } = require('../config/database');

const userAdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: String,
  role: String,
  deleted:Boolean,
  deletedAt: Date,
});



const userAdmin = mongoose.model('userAdmin', userAdminSchema, "userAdmins")

module.exports = userAdmin;
