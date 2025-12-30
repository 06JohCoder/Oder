const express = require("express");
const router = express.Router();
const Controller = require("../../controllers/admin/auth.controller");



router.get('/auth/login', Controller.login);

router.post('/auth/login', Controller.loginPost);

router.get('/auth/logout', Controller.logout);




module.exports = router;
