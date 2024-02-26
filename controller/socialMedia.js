const SocialMedia = require("../models/socialMedia");
const resp = require("../helpers/apiResponse");

exports.add_SocialMedia= async (req, res) => {
  const { select_sslmedia,url} = req.body;

  const newSocialMedia = new SocialMedia({
    select_sslmedia:select_sslmedia,
    url:url
   });
   
   newSocialMedia
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.get_socalList= async (req, res) => {
    await SocialMedia.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_socailMedia = async (req, res) => {
    await SocialMedia.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_socailMedia = async (req, res) => {
    await SocialMedia.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dlt_socailMedia = async (req, res) => {
    await SocialMedia.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  