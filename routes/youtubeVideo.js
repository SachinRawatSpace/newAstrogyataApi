const express = require("express");
const router = express.Router();


const {
    video, video_list, getone_video, edit_video, dlt_video, zegoLveStreaming
} = require("../controller/youtubeVideo");



router.post("/admin/video", video);
router.get("/admin/video_list", video_list);
router.get("/admin/getone_video/:id", getone_video)
router.post("/admin/edit_video/:id", edit_video);
router.get("/admin/dlt_video/:id", dlt_video);
router.post("/admin/zegoLveStreaming", zegoLveStreaming);


module.exports = router;

