const express = require("express");
const router = express.Router();
 

const {
    addCategory,
    getallCategory,
    getoneCategory,
    editCategory,
    dltCategory
   
} = require("../controller/category");

 
 
 router.post("/admin/addCategory", addCategory);
 router.get("/admin/getallCategory", getallCategory);
 router.get("/admin/getoneCategory/:id", getoneCategory);
 router.post("/admin/editCategory/:id", editCategory);
 router.get("/admin/dltCategory/:id", dltCategory);

module.exports = router;

