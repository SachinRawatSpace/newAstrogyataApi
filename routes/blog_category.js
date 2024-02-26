const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    add_blog_category,
    all_blog_category,
    getone_blog_Cat,
    edit_blog_cat,
    dlt_blog_cat,
    active_blog_category
 } = require("../controller/blog_category");

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
  
// PATHS
router.post("/admin/add_blog_category",multipleUpload, add_blog_category);
router.get("/admin/all_blog_category", all_blog_category);
router.get("/admin/getone_blog_Cat/:id", getone_blog_Cat);
 router.post("/admin/edit_blog_cat/:id",multipleUpload, edit_blog_cat);
 router.get("/admin/dlt_blog_cat/:id", dlt_blog_cat);
 router.get("/user/active_blog_category", active_blog_category);

module.exports = router;
