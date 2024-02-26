const express = require("express");
const router = express.Router();
 

const {
    add_PoojaChkOut,
    pujaChkOutList,
    // getOneComision,
    // editComision,
    // dltComision
} = require("../controller/checkoutPuja");

 
 
 router.post("/user/add_PoojaChkOut", add_PoojaChkOut);
router.get("/user/pujaChkOutList", pujaChkOutList);
// router.get("/admin/getOneComision/:id",     getOneComision)
// router.post("/admin/editComision/:id",     editComision);
// router.get("/admin/dltComision/:id",     dltComision)


module.exports = router;

