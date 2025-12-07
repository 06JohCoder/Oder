const express = require("express");
const router = express.Router();
const releController = require("../../controllers/admin/role.controller");



router.get('/role', releController.index);
router.get('/role/create', releController.create);
router.post('/role/create', releController.createPost);
router.get('/role/edit/:id', releController.edit);
router.patch('/role/edit/:id', releController.editPatch);
router.delete('/role/delete/:id', releController.delete);



module.exports = router;
