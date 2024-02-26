const express = require("express");
const router = express.Router();
//const { verifytoken } = require("../functions/verifytoken");


const {purchase_plan,recharge_list,add_custome_amt,del_reList,walletHistory,admin_walletHistory,delete_walletHistory

} = require("../controller/recharge_plan");

//Paths
router.post("/user/purchase_plan", purchase_plan);
 router.get("/user/recharge_list", recharge_list);
// router.get("/user/totalcomment", totalcomment);
// router.get("/user/getonereviewproduct/:id", getonereviewproduct);

router.post("/user/add_custome_amt", add_custome_amt);
router.get("/admin/del_reList/:id", del_reList);
router.get("/user/walletHistory/:id", walletHistory);
router.get("/user/admin_walletHistory", admin_walletHistory);
router.get("/admin/delete_walletHistory/:id", delete_walletHistory);








 

module.exports = router;
 