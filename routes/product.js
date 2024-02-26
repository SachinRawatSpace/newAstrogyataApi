const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addProduct, getProduct, viewoneProduct, editproduct, delproduct,
} = require("../controller/product");

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
  { name: "image", maxCount: 10 },

  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

// PATHS
router.post("/admin/addProduct", multipleUpload, addProduct);
router.get("/admin/getProduct", getProduct);
router.get("/admin/viewoneProduct/:id", viewoneProduct);
router.get("/admin/delproduct/:id", delproduct);
router.post("/admin/editproduct/:id", multipleUpload, editproduct);
//router.get("/user/productbycategory/:id", productbycategory);

module.exports = router;
