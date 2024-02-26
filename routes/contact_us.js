const express = require("express");
const router = express.Router();
 

const {
    add_contactus,
    getContactus,
    getoneContactus,
    editContactus,
    dltContactus
} = require("../controller/contact_us");

 
 
 router.post("/admin/add_contactus", add_contactus);
router.get("/admin/getContactus", getContactus);
router.get("/admin/getoneContactus/:id",     getoneContactus)
router.post("/admin/editContactus/:id",     editContactus);
router.get("/admin/dltContactus/:id",     dltContactus)


module.exports = router;

