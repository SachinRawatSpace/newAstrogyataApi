const express = require("express");
const router = express.Router();


const {
    token
} = require("../controller/astroVideo_token");



router.post("/user/token", token);

module.exports = router;

