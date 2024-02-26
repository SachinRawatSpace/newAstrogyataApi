const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    add_minCharges,
    all_min_recharge,
    dlt_min_charge,
    getone_min_charge,
    edit_min_charge,

} = require("../controller/min_charges");

 
  
 
 
 router.post("/admin/add_minCharges", add_minCharges);
 router.get("/user/all_min_recharge", all_min_recharge);

 router.get("/admin/getone_min_charge/:id", getone_min_charge);

 router.post("/admin/edit_min_charge/:id", edit_min_charge);

 router.get("/admin/dlt_min_charge/:id", dlt_min_charge);

module.exports = router;
  