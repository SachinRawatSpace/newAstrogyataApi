const Rashi = require("../models/rashi");
const resp = require("../helpers/apiResponse");

exports.addRashi= async (req, res) => {
  const { rashi_title ,desc,date,category} = req.body;

  const newRashi= new Rashi({
    rashi_title:rashi_title,
    desc:desc,
    date :date,
    category:category
   });
   const findexist = await Rashi.findOne({
    $and: [{ category:category}, { rashi_title: rashi_title }]
  });
  if (findexist) {
      resp.alreadyr(res);
  }{
   newRashi
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
  }



exports.Rashilist= async (req, res) => {
    await Rashi.find().populate("category")
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneRashi = async (req, res) => {
    await Rashi.findOne({ _id: req.params.id }).populate("category")
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
  

  exports.dltRashi= async (req, res) => {
    await Rashi.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  