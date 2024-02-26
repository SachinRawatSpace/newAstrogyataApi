const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addbanner,
  getbanner,
  viewonebanner,
  delbanner,
  getbannerbytype,
  editBanner,
  add_home_banner,
  get_home_banner,
  get_astromall_banner
} = require("../controller/banner");

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
  { name: "banner_img", maxCount: 10 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

// PATHS
router.post("/admin/addbanner", multipleUpload, addbanner);
router.get("/admin/getbanner", getbanner);
router.get("/admin/viewonebanner/:id", viewonebanner);
router.get("/admin/delbanner/:id", delbanner);
router.get("/admin/bannerbytype/:id", getbannerbytype);
router.post("/admin/editBanner/:id", multipleUpload, editBanner);
router.post("/admin/add_home_banner", multipleUpload, add_home_banner);
router.get("/admin/get_home_banner", get_home_banner);
router.get("/admin/get_astromall_banner", get_astromall_banner);


module.exports = router;
