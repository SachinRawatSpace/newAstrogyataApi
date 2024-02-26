const Commision = require("../models/commision");
const resp = require("../helpers/apiResponse");

exports.add_Comision = async (req, res) => {
  const { category, product, comision_name, comision_rate, status } = req.body;

  const newCommision = new Commision({
    category: category,
    product: product,
    comision_name: comision_name,
    comision_rate: comision_rate,
    status: status,

  });
  const findexist = await Commision.findOne({ $and: [{ category: category }, { product: product }] });
  //  console.log("findexist",findexist)
  if (findexist) {
    resp.alreadyr(res);
  } else {
    newCommision
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.comisionList = async (req, res) => {
  await Commision.find().populate("product").populate({
    path: "product",
    populate: {
      path: "category",
    },
  })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getOneComision = async (req, res) => {
  await Commision.findOne({ _id: req.params.id }).populate("product")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.editComision = async (req, res) => {
  await Commision.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.dltComision = async (req, res) => {
  await Commision.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
