const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { tokenverify } = require("../functions/tokenverify");

const {
  signup,
  astrosignup,
  verifyotp,
  astrologin,
  viewoneAstro,
  allAstro,
  editAstroDetails,
  dltAstro,
  loginsendotp,
  loginVerify,
  astrodetails,
  updteApprovedsts,
  getoneAstro,
  admin_astrop_list,
  status_change,
  exp_high_to_low,
  exp_low_to_high,
  price_high_to_low,
  price_low_to_high,
  rating_high_to_low,
  rating_low_to_high,
  logout,
  getAstrologers,
  astroCount,
  onlineAstroCount,
  offlineAstroCount,
  busyAstroCount,
  getWaitQueueList,
  deleteWaitQueueItem
} = require("../controller/astrologer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploads`;
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("pdf")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

let multipleUpload = uploads.fields([
  { name: "img", maxCount: 10 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

signup;
router.post("/user/signup", signup);
router.post("/user/verifyotp", verifyotp);
router.get('/user/deleteWaitQueueItem/:astrologerId/:userId', deleteWaitQueueItem);


router.post("/user/astrosignup", multipleUpload, astrosignup);
router.post("/user/astrologin", astrologin);
router.get("/user/viewoneAstro", tokenverify, viewoneAstro);
router.get("/admin/getoneAstro/:id", getoneAstro);

router.post("/user/editAstroDetails/:id", multipleUpload, editAstroDetails);

router.get("/admin/allAstro", allAstro);
router.get("/admin/admin_astrop_list", admin_astrop_list);

router.get("/user/getAstroFilter", getAstrologers);

router.get("/admin/dltAstro/:id", dltAstro);
router.post("/user/loginsendotp", loginsendotp);
router.post("/user/loginVerify", loginVerify);
router.get("/user/astrodetails/:id", astrodetails);
router.post("/admin/updteApprovedsts/:id", updteApprovedsts);
router.post("/user/status_change/:id", status_change);
router.get("/user/exp_high_to_low", exp_high_to_low);
router.get("/user/exp_low_to_high", exp_low_to_high);
router.get("/user/price_high_to_low", price_high_to_low);
router.get("/user/price_low_to_high", price_low_to_high);
router.get("/user/rating_high_to_low", rating_high_to_low);
router.get("/user/rating_low_to_high", rating_low_to_high);
router.get("/user/logout", logout);
router.get("/user/astroCount", astroCount);
router.get("/user/onlineAstroCount", onlineAstroCount);
router.get("/user/offlineAstroCount", offlineAstroCount);
router.get("/user/busyAstroCount", busyAstroCount);
router.get("/user/getWaitQueueList/:id", getWaitQueueList);



module.exports = router;
