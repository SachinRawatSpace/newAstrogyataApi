const express = require("express");
const router = express.Router();
 

const {
    adCat_horscope,
    getAll_CatHroscope,
    getone_CatHroscope,
    edit_CatHroscope,
    dlt_CatHroscope,
    pridiction_by_category
} = require("../controller/Horoscope");

 
 
 router.post("/admin/adCat_horscope", adCat_horscope);
 router.get("/admin/getAll_CatHroscope", getAll_CatHroscope);
 router.get("/admin/getone_CatHroscope/:id", getone_CatHroscope);
 router.post("/admin/edit_CatHroscope/:id", edit_CatHroscope);
 router.get("/admin/dlt_CatHroscope/:id", dlt_CatHroscope);
 router.get("/user/pridiction_by_category/:id", pridiction_by_category);

module.exports = router;

