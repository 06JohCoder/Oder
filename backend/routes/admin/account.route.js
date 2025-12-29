
const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/admin/account.controllers');


router.get('/listAccount',Controller.index);
router.get('/listAccount/create',Controller.getCreate)
router.post('/listAccount/create',Controller.create)


    
module.exports = router;