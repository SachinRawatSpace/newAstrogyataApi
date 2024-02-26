const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const agora = require("agora-access-token");

const {
  make_call,
  callStatus,
  call_Status,
  astroVideoCall,
  userVideoCall,
  Calling,
  astroCallHistory,
  userCallHistory,
  on_make_another_call,
  astroCompleteCall,
  dlCallHistory,
  getEarnings,
  adminCallHistory
} = require("../controller/make_call");

router.post("/user/make_call", make_call);
router.get("/user/getAstroEarnings/:id", getEarnings);
router.get("/user/callStatus/:sid", callStatus);
router.get("/user/call_Status", call_Status);
router.post("/user/astroVideoCall", astroVideoCall);
router.post("/user/userVideoCall", userVideoCall);
router.post("/user/userVideoCall", userVideoCall);
router.post("/user/Calling", Calling);
router.get("/user/astroCallHistory/:id", astroCallHistory);
router.get("/user/userCallHistory/:id", userCallHistory);
router.post("/user/make_another_call/:id", on_make_another_call);
router.get("/user/astroCompleteCall/:id", astroCompleteCall);
router.get("/user/dlCallHistory/:id", dlCallHistory);
router.get("/admin/adminCallHistory", adminCallHistory);



//const agora = require('agora-access-token');

module.exports = router;
