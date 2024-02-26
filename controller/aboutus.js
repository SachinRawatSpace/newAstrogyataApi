const Aboutus = require("../models/aboutus");
const resp = require("../helpers/apiResponse");

exports.add_aboutus= async (req, res) => {
  const { desc} = req.body;

  const newAboutus = new Aboutus({
    desc:desc,
   });
  const findexist = await Aboutus.findOne({ desc: desc });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newAboutus
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getAbout_us = async (req, res) => {
    await Aboutus.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_aboutus = async (req, res) => {
    await Aboutus.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_aboutus = async (req, res) => {
    await Aboutus.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_abtus = async (req, res) => {
    await Aboutus.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  