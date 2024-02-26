const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    add_otherPages,getpages,getonePages,editPages,dltPages
} = require("../controller/otherPages");


 
 router.post("/admin/add_otherPages", add_otherPages);
router.get("/admin/getpages", getpages);
 
router.get("/admin/getonePages/:id", getonePages);
router.post("/admin/editPages/:id", editPages);

router.get("/admin/dltPages/:id", dltPages);

module.exports = router;
 