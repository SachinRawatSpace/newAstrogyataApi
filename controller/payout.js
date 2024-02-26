const Payout = require("../models/payout");
const resp = require("../helpers/apiResponse");

exports.add_PayOut = async (req, res) => {
  const { astroId,payout_amt,transactionId,status} = req.body;

  const newPayout = new Payout({
    astroId:astroId,
    payout_amt:payout_amt,
    transactionId:transactionId,
    status:status
   });
//    const findexist = await Plans.findOne({ amount: amount });
//    if (findexist) {
//      resp.alreadyr(res);
//    } else {
    newPayout
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 //}
 

exports.PayoutList= async (req, res) => {
    await Payout.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getonePayout = async (req, res) => {
    await Payout.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editPayout = async (req, res) => {
    await Payout.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltPayoutlist = async (req, res) => {
    await Payout.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

 