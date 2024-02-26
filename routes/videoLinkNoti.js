const express = require("express");
const router = express.Router();


const {

    send_VideoLink, VdolinkList,acceptVideoNotificationByAstro,dltVideoNotification
} = require("../controller/videoLinkNoti");



router.post("/user/send_VideoLink", send_VideoLink);
router.get("/user/VdolinkList/:id", VdolinkList);

router.post("/user/acceptVideoNotificationByAstro/:id", acceptVideoNotificationByAstro);
router.get("/user/dltVideoNotification/:id", dltVideoNotification);


module.exports = router;

