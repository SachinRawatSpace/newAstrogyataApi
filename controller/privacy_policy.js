const PrivcyPolicy = require("../models/privacy_policy");
const resp = require("../helpers/apiResponse");

exports.addprivcyPlcy= async (req, res) => {
  const { title,desc} = req.body;

  const newPrivcyPolicy = new PrivcyPolicy({
    title:title,
    desc:desc,
   });
  const findexist = await PrivcyPolicy.findOne({ desc: desc });
  if (findexist) {
    resp.alreadyr(res);n  
  } else {
    newPrivcyPolicy
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getPrivcyPolicy= async (req, res) => {
    await PrivcyPolicy.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getonePrivcyPlcy = async (req, res) => {
    await PrivcyPolicy.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editPrivcyPlcy = async (req, res) => {
    await PrivcyPolicy.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltPrivcyPlcy = async (req, res) => {
    await PrivcyPolicy.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  