const express = require("express");
const router = express.Router();


const {
    astroLiveStreaming,
    listLiveStreamAstro,
    updateLiveStream,
    disConnectLiveStream,
    UerLiveStreamingToken


} = require("../controller/astroLiveStreaming");



router.post("/user/astroLiveStreaming", astroLiveStreaming);
router.get("/user/listLiveStreamAstro", listLiveStreamAstro);
router.post("/user/UerLiveStreamingToken", UerLiveStreamingToken);
router.post("/user/updateLiveStream/:id", updateLiveStream);
router.get("/user/disConnectLiveStream/:id", disConnectLiveStream);

module.exports = router;

