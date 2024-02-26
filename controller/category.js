const Category = require("../models/category");
const resp = require("../helpers/apiResponse");

exports.addCategory = async (req, res) => {
  const { title, desc } = req.body;

  const newCategory = new Category({
    title: title,
    desc: desc,
  });
  const findexist = await Category.findOne({ title: title });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newCategory
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.getallCategory = async (req, res) => {
  await Category.find()
    .sort({ createdAt: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneCategory = async (req, res) => {
  await Category.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.editCategory = async (req, res) => {
  await Category.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dltCategory = async (req, res) => {
  await Category.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
