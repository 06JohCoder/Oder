const express = require('express');
const router = express.Router();


router.get('/category', userAdmins.userAdmin);

module.exports = router
