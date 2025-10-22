const mongoose = require('mongoose');

const userAdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: String,
  role: String,
});

const userAdmin = mongoose.model('userAdmin', userAdminSchema, "userAdmins")

module.exports = userAdmin;
