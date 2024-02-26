const Horscope = require("../models/Horoscope");
const Category = require("../models/category");

const resp = require("../helpers/apiResponse");

exports.adCat_horscope= async (req, res) => {
  const { hrscp_category,desc} = req.body;

  const newHorscope= new Horscope({
 
    hrscp_category:hrscp_category,
    desc:desc,
    
    
   });
  
   newHorscope
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 
 

exports.getAll_CatHroscope = async (req, res) => {
    await Horscope.find().populate("hrscp_category")
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_CatHroscope = async (req, res) => {
    await Horscope.findOne({ _id: req.params.id }).populate("hrscp_category")
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_CatHroscope = async (req, res) => {
    await Horscope.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_CatHroscope= async (req, res) => {
    await Horscope.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.pridiction_by_category = async (req, res) => {
    await Category.find({ category: req.params.id }).populate("hrscp_category")
        .sort({ sortorder: 1 })
         
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };