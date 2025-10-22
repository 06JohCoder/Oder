const express = require('express');
const router = express.Router();
const userAdmins = require('../../controllers/admin/userAdmin.controllers')

router.get('/userAdmin', userAdmins.userAdmin);
module.exports = router
