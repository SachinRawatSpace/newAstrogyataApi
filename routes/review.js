const express = require("express");
const router = express.Router();
//const { verifytoken } = require("../functions/verifytoken");


const {
  addChatReview,addCallReview,addVideoreview,allRevieAstro,totalcomment,totalrating,getavgrating,getonereviewproduct,reviewList,getone_review,edit_review,commentReply,dltComments
} = require("../controller/review");

//Paths
router.post("/user/addChatReview", addChatReview);
router.post("/user/addCallReview", addCallReview);
router.post("/user/addVideoreview", addVideoreview);

router.get("/user/allRevieAstro/:id", allRevieAstro);
router.get("/user/totalcomment", totalcomment);
router.get("/user/getonereviewproduct/:id", getonereviewproduct);
router.get("/user/reviewList", reviewList);
router.get("/user/getone_review/:id", getone_review);
router.post("/user/edit_review/:id", edit_review);
router.post("/user/commentReply/:id", commentReply);
router.get("/user/dltComments/:id", dltComments);





 



 

module.exports = router;
 