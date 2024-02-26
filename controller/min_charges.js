const Minutecharge = require("../models/min_charges");
const resp = require("../helpers/apiResponse");

exports.add_minCharges = async (req, res) => {
  const { minute} = req.body;

  const newMinutecharge = new Minutecharge({
    minute:minute,
    
   });
   const findexist = await Minutecharge.findOne({ minute: minute });
   if (findexist) {
     resp.alreadyr(res);
   } else {
    newMinutecharge
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 }
 

exports.all_min_recharge= async (req, res) => {
    await Minutecharge.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_min_charge = async (req, res) => {
    await Minutecharge.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_min_charge = async (req, res) => {
    await Minutecharge.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_min_charge = async (req, res) => {
    await Minutecharge.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.active_plans= async (req, res) => {
    await Plans.find({status:"Active"})
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };