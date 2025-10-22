const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/home.controllers')



router.get('/products', controller.index);
module.exports = router

