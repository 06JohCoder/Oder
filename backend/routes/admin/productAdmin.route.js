const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/admin/products.controllers');
const validate = require('../../validate/product.validate');


router.get('/products', controllers.index);
router.patch('/products/change-status/:status/:id', controllers.changeStatus)
router.patch('/products/change-multi', controllers.changeMulti)
router.delete('/products/delete/:id', controllers.deleteItem)
router.get('/products/create', controllers.createGet)
router.post('/products/create',
    validate.create,
    controllers.create)
router.get('/products/edit/:id',
    controllers.edit)

    
router.patch('/products/edit/:id',
    validate.create,
    controllers.editPatch)
    
module.exports = router;

