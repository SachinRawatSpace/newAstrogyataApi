const express = require("express");
const router = express.Router();

const { verifytoken } = require("../functions/verifytoken");

const {
    add_shipping_address,
    viewone_address,
    edit_address,
    dlt_address,
  viewoneuseraddress,
  getone_address
} = require("../controller/shipping_adrss");

//Paths
router.post("/user/add_shipping_address", add_shipping_address);
 router.get("/user/viewone_address/:id", viewone_address);
 router.get("/user/getone_address/:id", getone_address);

 router.post("/user/edit_address/:id",  edit_address);
router.get("/user/dlt_address/:id", dlt_address);

module.exports = router;
