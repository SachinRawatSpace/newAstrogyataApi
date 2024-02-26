const express = require("express");
const router = express.Router();
 

const {
    add_aboutus,
    getAbout_us,
    getone_aboutus,
    edit_aboutus,
    dlt_abtus
} = require("../controller/aboutus");

 
 
router.post("/admin/add_aboutus", add_aboutus);
router.get("/admin/getAbout_us", getAbout_us);
router.get("/admin/getone_aboutus/:id",     getone_aboutus)
router.post("/admin/edit_aboutus/:id",     edit_aboutus);
router.get("/admin/dlt_abtus/:id",     dlt_abtus)


module.exports = router;

