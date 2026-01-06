const express = require("express");
const router = express.Router();
const settingController = require("../../controllers/admin/setting.controller");
const settingValidate = require("../../validate/setting.validate");

// settingValidate.settingProfileEdit, 

router.get('/setting/profile', settingController.profile);
router.patch('/setting/profile/edit', settingValidate.settingProfileEdit, settingController.editProfile);




module.exports = router;
