const OtherPages = require("../models/otherPages");
const resp = require("../helpers/apiResponse");

exports.add_otherPages = async (req, res) => {
  const { pageName,desc,other,count,status} = req.body;

  const newOtherPages = new OtherPages({
    pageName:pageName,
    desc:desc,
    other:other,
    status:status,
    count:count
   });
 
   newOtherPages
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 
 

exports.getpages= async (req, res) => {
    await OtherPages.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getonePages = async (req, res) => {
    await OtherPages.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editPages = async (req, res) => {
    await OtherPages.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltPages = async (req, res) => {
    await OtherPages.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

 