
const express = require("express");
const router = express.Router();


const {
    user_ask_qus,
    list_ask_qus,
    reply,
    getone_ask_qus,
    astro_ques_list,
    dlt_ask_qus,
    user_ask_qus_list


} = require("../controller/ASK_qus");



router.post("/user/user_ask_qus", user_ask_qus);
router.get("/user/list_ask_qus/:astroid/:userid", list_ask_qus);
router.get("/user/user_ask_qus_list/:id", user_ask_qus_list);

router.post("/user/reply/:id", reply);
router.get("/user/astro_ques_list/:id", astro_ques_list);
router.get("/user/getone_ask_qus/:id", getone_ask_qus);
router.get("/user/dlt_ask_qus/:id", dlt_ask_qus);



module.exports = router;










