const express = require("express");
const router = express.Router();
 

const {
    addFAQ,
    faq_list,
    editprofile,
    dltFaq
   
} = require("../controller/faq");

 
 
 router.post("/admin/addFAQ", addFAQ);
router.get("/admin/faq_list", faq_list);
router.get("/admin/dltFaq/:id", dltFaq);

module.exports = router;

