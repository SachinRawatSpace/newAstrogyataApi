const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
    add_chat_intake,
    intekListByastro,
    get_chat_intake,
    getone_user_chatintek,
    editContactus,
    dlt_ChatIntek,
    intekListByUser,
    getone_chatintek,
    edit_ChatIntake,
    selectIntakeForm,
    intetakeNotification
} = require("../controller/chat_intake_form");

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
    { name: "file", maxCount: 10 },

    //   { name: "storepan_img", maxCount: 5 },
    //   { name: "tradelicence_img", maxCount: 5 },
    //   { name: "companypan_img", maxCount: 5 },
    //   { name: "address_proof_img", maxCount: 5 },
]);

router.post("/user/add_chat_intake", multipleUpload, add_chat_intake);
router.get("/admin/intekListByastro/:id", intekListByastro);
router.get("/admin/intekListByUser/:id", intekListByUser);

router.get("/admin/get_chat_intake", get_chat_intake);

router.get("/admin/getone_user_chatintek/:id", getone_user_chatintek)
// router.post("/admin/editContactus/:id",     editContactus);
router.get("/admin/dlt_ChatIntek/:id", dlt_ChatIntek)
router.get("/admin/getone_chatintek/:id", getone_chatintek)
router.post("/user/edit_ChatIntake/:id", multipleUpload, edit_ChatIntake);
router.post("/user/selectIntakeForm", selectIntakeForm);
router.get("/user/intetakeNotification", intetakeNotification);

module.exports = router;

