const Plans = require("../models/plan");
const resp = require("../helpers/apiResponse");

exports.add_plan = async (req, res) => {
  const { title,amount} = req.body;

  const newPlans = new Plans({
    title:title,
    amount:amount,
   });
   const findexist = await Plans.findOne({ amount: amount });
   if (findexist) {
     resp.alreadyr(res);
   } else {
    newPlans
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 }
 

exports.allplans= async (req, res) => {
    await Plans.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneplan = async (req, res) => {
    await Plans.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editplan = async (req, res) => {
    await Plans.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltplan = async (req, res) => {
    await Plans.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.active_plans= async (req, res) => {
    await Plans.find({status:"Active"})
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };