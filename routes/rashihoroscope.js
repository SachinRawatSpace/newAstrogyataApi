const express = require("express");
const router = express.Router();
 

const {
    add_Rhscope,
    get_Rhscope,
    getone_Rhscope,
    edit_Rhscope,
    dlt_Rhscope,
    rashi_by_category
} = require("../controller/rashihoroscope");



router.post("/admin/add_Rhscope", add_Rhscope);
router.get("/admin/get_Rhscope", get_Rhscope);
router.get("/admin/getone_Rhscope/:id",  getone_Rhscope)
router.post("/admin/edit_Rhscope/:id",  edit_Rhscope);
router.get("/admin/dlt_Rhscope/:id",  dlt_Rhscope);

router.get("/admin/rashi_by_category/:id",  rashi_by_category)

module.exports = router;

