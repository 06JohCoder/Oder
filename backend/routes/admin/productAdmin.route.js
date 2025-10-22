const express = require('express');
const router = express.Router();
const products = require('../../controllers/admin/products.controllers');

router.get('/products',products.index);

module.exports = router;

