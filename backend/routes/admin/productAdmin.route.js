const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin/products.controllers');
const validate = require('../../validate/product.validate');


router.get('/products',controllers.index);

router.patch('/products/change-status/:status/:id',controllers.changeStatus)
router.patch('/products/change-multi',controllers.changeMulti)
router.delete('/products/delete/:id',controllers.deleteItem)
router.post('/products/create',
    validate.create,
    controllers.create)
module.exports = router;

