const express = require("express");
const router = express.Router();

const {
  addCallDuration,
  deductBalance,
  changeToAvailable,
  userChathistory,
  astroChathistory,
  dltallChat,
  adminVedioChathistory,
  stop_cron,
  userVideohistory,
  
} = require("../controller/callDuration");

router.post("/user/addCallDuration", addCallDuration);
router.post("/user/deductChatBalance", deductBalance);
router.post("/user/changeStatus", changeToAvailable);
router.get("/user/userChathistory/:id", userChathistory);
router.get("/user/astroChathistory/:id", astroChathistory);
router.get("/admin/dltallChat", dltallChat);
router.get("/admin/adminVedioChathistory", adminVedioChathistory);
router.get("/admin/stop_cron", stop_cron);
router.get("/user/userVideohistory/:id", userVideohistory);

module.exports = router;
