const Faq = require("../models/faq");
const resp = require("../helpers/apiResponse");

exports.addFAQ = async (req, res) => {
  const { title,desc } = req.body;

  const newFaq = new Faq({
    title: title,
    desc:desc
  });
 
    newFaq
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }



exports.faq_list = async (req, res) => {
    await Faq.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.dltFaq = async (req, res) => {
    await Faq.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };