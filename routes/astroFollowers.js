const express = require("express");
const router = express.Router();


const {
    addAstroFollowers, getone_followers, unfollow_astrologer

} = require("../controller/astroFollowers");



router.post("/user/addAstroFollowers", addAstroFollowers);
router.get("/user/getone_followers/:userid/:astroid", getone_followers);

router.get("/user/unfollow_astrologer/:userid/:astroid", unfollow_astrologer);

module.exports = router;

