const TermsCondition = require("../models/terms_condition");
const resp = require("../helpers/apiResponse");

exports.add_term_cond= async (req, res) => {
  const { desc} = req.body;

  const newTermsCondition = new TermsCondition({
    desc:desc,
   });
   
    newTermsCondition
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.get_term_cond= async (req, res) => {
    await TermsCondition.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_term_cond = async (req, res) => {
    await TermsCondition.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_term_cond = async (req, res) => {
    await TermsCondition.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_term_cond = async (req, res) => {
    await TermsCondition.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  