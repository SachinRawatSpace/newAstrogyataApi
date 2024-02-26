const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    add_notification,
    get_notification,
    dlt_notification,
    admin_notification
} = require("../controller/notification");





router.post("/admin/add_notification", add_notification);
router.get("/admin/get_notification/:id", get_notification);
router.get("/admin/dlt_notification/:id", dlt_notification);
router.get("/admin/admin_notification", admin_notification);

module.exports = router;
