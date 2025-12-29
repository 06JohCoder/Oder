
const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/admin/backUp.controllers');


router.get('/backup/products',Controller.indexProducts);
router.patch('/backup/products/:status/:id',Controller.indexProductsBack)
router.delete('/backup/products/delete/:id',Controller.indexProductsDelete)



    
module.exports = router;