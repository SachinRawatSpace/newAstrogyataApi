const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    add_PayOut,
    PayoutList,
    getonePayout,
    editPayout,
    dltPayoutlist
} = require("../controller/payout");


 
 router.post("/user/add_PayOut", add_PayOut);
 router.get("/user/PayoutList", PayoutList);
// router.get("/user/active_plans", active_plans);

router.get("/user/getonePayout/:id", getonePayout);
 router.post("/admin/editPayout/:id", editPayout);
  
 router.get("/admin/dltPayoutlist/:id", dltPayoutlist);



 
module.exports = router;
