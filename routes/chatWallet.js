const express = require("express");
const router = express.Router();

const {
    addChatWallet,
    getOne_Conversation_Wallet,
    addCallWallet,
    addVideoCallWallet,
    acceptChat,
    ChatWaiting,
    wait_queue_list,
    accepted_notification,
    dltNotificattion,
    dlt_wait_queue,
    acceptNotificationByAstro,
    getOnenotificationByastro,
    VideoNotification,
    dltallAllChat,
    appVideoCalling
    //   addCallWallet_new

} = require("../controller/chatWallet");

//Paths
router.post("/user/addChatWallet", addChatWallet);
router.post("/user/acceptNotificationByAstro/:id", acceptNotificationByAstro);

router.get("/user/getOne_Conversation_Wallet/:id", getOne_Conversation_Wallet);
router.post("/user/addCallWallet", addCallWallet);
router.post("/user/addVideoCallWallet", addVideoCallWallet);
router.post("/user/acceptChat/:id", acceptChat);
router.get("/user/ChatWaiting/:id", ChatWaiting);
router.get("/user/wait_queue_list/:id", wait_queue_list);
router.get("/admin/dlt_wait_queue/:id", dlt_wait_queue);


router.get("/user/accepted_notification/:id", accepted_notification);

router.get("/admin/dltNotificattion/:id", dltNotificattion);
router.get("/user/getOnenotificationByastro/:id", getOnenotificationByastro);

router.get("/user/VideoNotification/:id", VideoNotification);
router.get("/user/dltallAllChat", dltallAllChat);
router.post("/user/appVideoCalling", appVideoCalling);








module.exports = router;
