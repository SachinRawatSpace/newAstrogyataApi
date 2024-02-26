const Recharge = require("../models/recharge_plan");
const Plans = require("../models/plan");
const User = require("../models/users");
const WalletT = require("../models/walletTransaction");

const resp = require("../helpers/apiResponse");

exports.purchase_plan = async (req, res) => {
  const { userid, planid, beforeAmt, creditedAmt, finalAmt } = req.body;


  const userdetail = await User.findOne({ _id: req.body.userid })
  const oldamt = userdetail.amount
  //console.log("OLD AMT", oldamt)

  const getone = await Plans.findOne({ _id: req.body.planid })
  //  console.log("STRING", getone)


  var amt = getone.amount
  var offer = getone.title

  // console.log("Offer", offer)


  let totalAmt = getone.title != 0 ? amt + amt * offer / 100 : amt
  // console.log("totalAmt", totalAmt)
  // console.log("amt", amt)

  let finalamt = oldamt + totalAmt
  var gstamt = amt * 18 / 100
  // console.log("gstAmt", gstamt)
  let totalamt = amt + gstamt
  // console.log("ttl_amt", totalamt)
  const newRecharge = new Recharge({
    userid: userid,
    planid: planid,
    ttl_amt: req.body.ttl_amt,
    tran_Type: "Credited",
    transaction_id: "RE" + Date.now(),
    beforeAmt: oldamt,
    creditedAmt: totalAmt,
    finalAmt: finalamt
  });

  const newWalletT = new WalletT({
    userid: userid,
    planid: planid,
    ttl_amt: req.body.ttl_amt,
    tran_Type: "Credited",
    transaction_id: "RE" + Date.now(),
    beforeAmt: oldamt,
    creditedAmt: totalAmt,
    finalAmt: finalamt

  });
  newRecharge
    .save()
    .then(async (data) => {
      const createTable = await WalletT.create(newWalletT);
      // console.log("MMMMMM",createTable)
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        gstAmt: gstamt,
        ttl_amt: totalamt,
        beforeAmt: oldamt,
        creditedAmt: totalAmt,
        finalAmt: finalamt
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
  const finduserAndupdate = await User.findOneAndUpdate(

    { _id: req.body.userid },

    { $set: { amount: finalamt, creditAmt: totalAmt } },

    //     { amount: currntamt },

    // { $set: {status:"success"} },
    { new: true },
  )
  if (finduserAndupdate) {
    console.log("UPDATE USER AMOUNT", finduserAndupdate)

  }


  //   .then((data) => resp.successr(res, data))
  //   .catch((error) => resp.errorr(res, error));
}




exports.recharge_list = async (req, res) => {
  await Recharge.find().populate("userid").populate("planid")
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneRashi = async (req, res) => {
  await Rashi.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.updateRashi = async (req, res) => {
  await Rashi.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.del_reList = async (req, res) => {
  await Recharge.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.add_custome_amt = async (req, res) => {
  const { userid, amount } = req.body;

  const newRecharge = new Recharge({
    userid: userid,
    amount: amount,
    tran_Type: "Credited",
    transaction_id: "RE" + Date.now()
  });

  const newWalletT = new WalletT({
    userid: userid,
    amount: amount,
    tran_Type: "Credited",
    transaction_id: "RE" + Date.now()
  });
  var gstamt = amount * 18 / 100
  // console.log("gstAmt", gstamt)
  totalamt = parseInt(amount) + parseInt(gstamt)
  //  console.log("ttl_amt", totalamt)
  const getoneuser = await User.findOne({ _id: req.body.userid })
  //  console.log("STRING", getoneuser)
  const getwallet = getoneuser.amount
  // console.log("getwallet", getwallet)

  const ttl_wlltamt = parseInt(getwallet) + parseInt(totalamt)
  // console.log("amtt", totalamt)
  if (getoneuser) {


    let qur = await User.findOneAndUpdate(
      { _id: req.body.userid },

      { $set: { amount: ttl_wlltamt } },

      //{ $set: {status:"success"} },
      { new: true }

    );
    // console.log("Update", qur)

  }
  newRecharge
    .save()
    .then(async (data) => {
      const createTable = await WalletT.create(newWalletT);
      // console.log("MMMMMM",createTable)
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
        gstAmt: gstamt,
        ttl_amt: totalamt,
        wallet_amt: ttl_wlltamt
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
}



exports.walletHistory = async (req, res) => {
  const getone = await WalletT.find({ userid: req.params.id })
    .populate("userid").populate("planid").populate("astroid").populate("recharge_planId").sort({ createdAt: -1 })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}


exports.admin_walletHistory = async (req, res) => {
  const getone = await WalletT.find({ status: "Completed" })
    .populate("userid").populate("planid").populate("astroid").populate("recharge_planId").sort({ createdAt: -1 })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}

exports.delete_walletHistory = async (req, res) => {

  await WalletT.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));

}