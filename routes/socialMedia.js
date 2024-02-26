const express = require("express");
const router = express.Router();
 

const {
    add_SocialMedia,
    get_socalList,
    getone_socailMedia,
    edit_socailMedia,
    dlt_socailMedia
} = require("../controller/socialMedia");

 
 
 router.post("/admin/add_SocialMedia", add_SocialMedia);
router.get("/admin/get_socalList", get_socalList);
router.get("/admin/getone_socailMedia/:id",  getone_socailMedia)
router.post("/admin/edit_socailMedia/:id",  edit_socailMedia);
router.get("/admin/dlt_socailMedia/:id",  dlt_socailMedia);


module.exports = router;

