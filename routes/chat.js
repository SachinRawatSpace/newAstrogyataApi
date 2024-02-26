const express = require("express");
const router = express.Router();

const {
  addchat,
  allchatwithuser,
  unreadmessages,
  getallchatrooms,
  clearchat,
  markasread,
  add_chatroom,
  allchatwithAstro,
  userChatList,
  getone_chat,
  getroomid,
  astrogetRoomid
  
} = require("../controller/chat");

//Paths
router.post("/user/addchat/:id", addchat);
router.post("/user/add_chatroom/:id", add_chatroom);

router.get("/user/allchatwithuser/:id", allchatwithuser);
router.get("/user/allchatwithAstro/:id", allchatwithAstro);

router.get("/user/unreadmessages/:id", unreadmessages);
router.get("/user/getallchatrooms/:id", getallchatrooms);
router.get("/user/clearchat/:id", clearchat);
router.post("/user/markasread/:id", markasread);
router.get("/user/userChatList/:id", userChatList);
router.get("/user/getone_chat/:userid/:astroid", getone_chat);
router.get("/user/getroomid/:id", getroomid);
router.get("/user/astrogetRoomid/:id", astrogetRoomid);








 
module.exports = router;
