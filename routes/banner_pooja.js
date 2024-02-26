const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");


const {
    add_PoojaBanner,
    get_PoojaBanner,
    viewone_PoojaBanner,
    edit_PoojaBanner,
    del_PoojaBanner

} = require("../controller/banner_pooja");

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

 
 router.post("/admin/add_PoojaBanner",multipleUpload, add_PoojaBanner);
 router.get("/user/get_PoojaBanner", get_PoojaBanner);
 router.get("/admin/viewone_PoojaBanner/:id", viewone_PoojaBanner);
 router.post("/admin/edit_PoojaBanner/:id", edit_PoojaBanner);
 router.get("/admin/del_PoojaBanner/:id", del_PoojaBanner);

module.exports = router;

