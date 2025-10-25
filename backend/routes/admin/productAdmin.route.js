const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin/products.controllers');

router.get('/products',controllers.index);

router.patch('/products/change-status/:status/:id',controllers.changeStatus)

module.exports = router;

