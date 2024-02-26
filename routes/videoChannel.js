const express = require("express");
const router = express.Router();
 //console

const {
    add_VideoChannel,channelList,getoneChannl,dltVideoChannl
} = require("../controller/videoChannel");

//Paths
router.post("/user/add_VideoChannel", add_VideoChannel);
router.get("/user/channelList/:id", channelList);
router.get("/user/getoneChannl/:id", getoneChannl
);
router.get("/user/dltVideoChannl/:id", dltVideoChannl);




 

module.exports = router;
 