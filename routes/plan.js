const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    add_plan,
    allplans,
    getoneplan,
    dltplan,
    editplan,
    active_plans
} = require("../controller/plan");


 
 router.post("/admin/add_plan", add_plan);
router.get("/admin/allplans", allplans);
router.get("/user/active_plans", active_plans);

router.get("/admin/getoneplan/:id", getoneplan);
router.post("/admin/editplan/:id", editplan);

router.get("/admin/dltplan/:id", dltplan);

module.exports = router;
 