const mongoose = require('mongoose');

// const { mongoose } = require('../config/database');
const slug = require('mongoose-slug-updater');

const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  permissions:{
    type: Array,
    default: []
  },
//   status: { type: String, default: "active" },
  deleted: {
    type: Boolean,
    default: false
  },
  
  deletedAt: Date,
},
  {
    timestamps: true
  });

const role = mongoose.model('role', roleSchema, 'roles');

module.exports = role;

