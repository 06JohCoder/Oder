const express = require("express");
const router = express.Router();
const userAccount = require("../../controllers/admin/user.controllers");



router.get('/user-accounts', userAccount.index);

module.exports = router;
