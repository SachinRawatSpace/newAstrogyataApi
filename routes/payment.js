const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");


const {
    payment_requests,
    generate_access_token,
    fetch_payment_details
} = require("../controller/payment");


 
 router.post("/user/payment_requests", payment_requests);
 
 router.post("/user/generate_access_token", generate_access_token);
 router.get("/user/fetch_payment_details/:paymentRequestId", fetch_payment_details);

 
module.exports = router;
