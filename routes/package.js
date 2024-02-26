const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    addPackage, getPackage, viewonePackage, delPackage, editPackage
} = require("../controller/package");

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
router.post("/admin/addPackage", multipleUpload, addPackage);
router.get("/admin/getPackage", getPackage);
router.get("/admin/viewonePackage/:id", viewonePackage);
router.get("/admin/delPackage/:id", delPackage);
router.post("/admin/editPackage/:id", multipleUpload, editPackage);
// router.get("/user/blog_by_category/:id", blog_by_category);

module.exports = router;
