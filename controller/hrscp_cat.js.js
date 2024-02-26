const Hrsp_cat = require("../models/hrscp_cat");
const resp = require("../helpers/apiResponse");

exports.addCategory= async (req, res) => {
  const { title,category,desc} = req.body;

  const newHrsp_cat = new Hrsp_cat({
    title:title,
    category:category,
    desc:desc,
    
    
   });
   const findexist = await Hrsp_cat.findOne({ title: title });
   if (findexist) {
     resp.alreadyr(res);
   } else {
    newHrsp_cat
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 }
 

exports.getallCategory = async (req, res) => {
    await Hrsp_cat.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneCategory = async (req, res) => {
    await Hrsp_cat.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editCategory = async (req, res) => {
    await Hrsp_cat.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltCategory= async (req, res) => {
    await Hrsp_cat.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  