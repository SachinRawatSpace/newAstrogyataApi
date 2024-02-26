const express = require("express");
const router = express.Router();
 

const {
    addRashi,
    Rashilist,
    getoneRashi,
    updateRashi,
    dltRashi
} = require("../controller/rashi");



router.post("/admin/addRashi", addRashi);
router.get("/admin/Rashilist", Rashilist);
router.get("/admin/getoneRashi/:id",  getoneRashi)
router.post("/admin/updateRashi/:id",  updateRashi);
router.get("/admin/dltRashi/:id",  dltRashi);


module.exports = router;

