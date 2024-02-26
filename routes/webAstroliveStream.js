const express = require("express");
const router = express.Router();


const {
    WebliveStream,
    closeLiveStream,
    listWebLiveStream
} = require("../controller/webAstroliveStream");



router.post("/user/WebliveStream", WebliveStream);
router.get("/user/closeLiveStream/:id", closeLiveStream);
router.get("/user/listWebLiveStream", listWebLiveStream);



module.exports = router;

