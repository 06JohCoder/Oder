const express = require('express');
const router = express.Router();
const infoOrderControllers = require("../../controllers/admin/infoOrder.controllers");

router.get('/infoOrder', infoOrderControllers.userOrder);
    
module.exports = router
