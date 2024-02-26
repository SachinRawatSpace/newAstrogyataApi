const Rhoroscope = require("../models/rashihoroscope");
const resp = require("../helpers/apiResponse");

exports.add_Rhscope= async (req, res) => {
  const { title,sort_desc,long_desc,category,rashiId} = req.body;

  const newRhoroscope = new Rhoroscope({
    title:title,
    sort_desc:sort_desc,
    long_desc:long_desc,
    category:category,
    rashiId:rashiId
  
   });
   const findexist = await Rhoroscope.findOne({ title: title });
   if (findexist) {
     resp.alreadyr(res);
   } else {
    newRhoroscope
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 }
 

exports.get_Rhscope= async (req, res) => {
    await Rhoroscope.find().populate("rashiId").populate("category")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_Rhscope = async (req, res) => {
    await Rhoroscope.findOne({ _id: req.params.id }).populate("rashiId")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_Rhscope = async (req, res) => {
    await Rhoroscope.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_Rhscope= async (req, res) => {
    await Rhoroscope.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.rashi_by_category = async (req, res) => {
    await Rhoroscope.find({ category: req.params.id }).populate("rashiId").populate("category")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  };