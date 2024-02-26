const express = require("express");
const router = express.Router();


const {
    add_poojaList,
    admin_poojaList,
    dlt_poojaList,
    getone_poojaList,
    edit_poojalist

} = require("../controller/poojaList");



router.post("/admin/add_poojaList", add_poojaList);

router.get("/admin/admin_poojaList", admin_poojaList);
router.get("/admin/getone_poojaList/:id", getone_poojaList);
router.get("/admin/dlt_poojaList/:id", dlt_poojaList);
router.post("/admin/edit_poojalist/:id", edit_poojalist);




module.exports = router;

