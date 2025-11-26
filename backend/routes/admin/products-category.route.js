const express = require('express');
const router = express.Router();
const controllerCategory = require("../../controllers/admin/products-category.controllers")
const validate = require('../../validate/category.validate.js');

router.get('/category',controllerCategory.index );
// router.get('/category/create', controllerCategory.create)
router.post('/category/create',
    validate.create,
    controllerCategory.create)

module.exports = router
