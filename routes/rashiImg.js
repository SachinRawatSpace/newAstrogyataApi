const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {addRashiImg,getRashiImg,viewoneRashiImg,delRashiImg,editRashiImg
   
 } = require("../controller/rashiImg");

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
    { name: "rashiImg", maxCount: 1 },
   
    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
  ]);
  
// PATHS
router.post("/admin/addRashiImg",multipleUpload, addRashiImg);
router.get("/admin/getRashiImg", getRashiImg);
router.get("/admin/viewoneRashiImg/:id", viewoneRashiImg);
router.get("/admin/delRashiImg/:id", delRashiImg);
 router.post("/admin/editRashiImg/:id",multipleUpload, editRashiImg);

module.exports = router;
 