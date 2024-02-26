const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
  //  var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

  require("fs").writeFile("out.png", base64Data, "base64", function (err) {
    console.log(err);
  });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


const upload = multer({ storage: storage });
const {
  upload_astrogallery, get_astroGallery, delGalleryvideo, edit_astrogallery
} = require("../controller/astroGallery");

//PATHS

router.post(
  "/admin/upload_astrogallery",
  upload.single("file"),
  upload_astrogallery
);

// router.get("/admin/getvideo", getvideo);
// router.get("/admin/deletevideo/:id", deletevideo);
// router.get("/admin/videobycourse/:id", videobycourse);
// router.post(
//   "/admin/addvideobyadmin",
//   upload.fields([
//     {
//       name: "video_file",
//     },
//     {
//       name: "video_image",
//     },
//   ]),
//   addvideobyadmin
// );
router.get("/admin/get_astroGallery/:id", get_astroGallery);
router.get("/user/delGalleryvideo/:id", delGalleryvideo);
router.post("/user/edit_astrogallery/:id",upload.single("file"), edit_astrogallery);


module.exports = router;


//