const express = require("express");
const router = express.Router();
 

const {
    addprivcyPlcy,
    getPrivcyPolicy,
    getonePrivcyPlcy,
    editPrivcyPlcy,
    dltPrivcyPlcy
} = require("../controller/privacy_policy");



router.post("/admin/addprivcyPlcy", addprivcyPlcy);
router.get("/admin/getPrivcyPolicy", getPrivcyPolicy);
router.get("/admin/getonePrivcyPlcy/:id",  getonePrivcyPlcy)
router.post("/admin/editPrivcyPlcy/:id",  editPrivcyPlcy);
router.get("/admin/dltPrivcyPlcy/:id",  dltPrivcyPlcy);


module.exports = router;

