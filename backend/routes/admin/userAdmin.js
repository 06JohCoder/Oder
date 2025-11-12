const express = require('express');
const router = express.Router();
const userAdmins = require('../../controllers/admin/userAdmin.controllers')

router.get('/userAdmin', userAdmins.userAdmin);
router.delete('/userAdmin/delete/:id',userAdmins.deleteUserAdmin)
router.patch('/userAdmin/edit/:id',userAdmins.editUserAdmin )
module.exports = router
