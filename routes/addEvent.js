const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    admin_Addevent,
    get_adminevent,
    admin_getone_event,
    admin_edit_event,
    admin_dlt_event,
    productbyPoojatyp


} = require("../controller/addEvent");


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
    { name: "poojaimg", maxCount: 10 },

    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
]);

router.post("/admin/admin_Addevent", multipleUpload, admin_Addevent);

router.get("/admin/get_adminevent", get_adminevent);
router.get("/admin/admin_getone_event/:id", admin_getone_event);
router.post("/admin/admin_edit_event/:id", admin_edit_event);
router.get("/admin/admin_dlt_event/:id", admin_dlt_event);
router.get("/admin/productbyPoojatyp/:id", productbyPoojatyp);




module.exports = router;

