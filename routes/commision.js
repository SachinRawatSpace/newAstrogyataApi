const express = require("express");
const router = express.Router();
 

const {
    add_Comision,
    comisionList,
    getOneComision,
    editComision,
    dltComision
} = require("../controller/commision");

 
 
 router.post("/admin/add_Comision", add_Comision);
router.get("/admin/comisionList", comisionList);
router.get("/admin/getOneComision/:id",     getOneComision)
router.post("/admin/editComision/:id",     editComision);
router.get("/admin/dltComision/:id",     dltComision)


module.exports = router;

