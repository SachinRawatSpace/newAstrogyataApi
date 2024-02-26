const PujaChkOut = require("../models/checkoutPuja");
const resp = require("../helpers/apiResponse");

exports.add_PoojaChkOut= async (req, res) => {
  const {pujaId, userid,productId} = req.body;

  const newPujaChkOut = new PujaChkOut({
    pujaId:pujaId,
    userid:userid,
    productId:productId,
   });
 
   newPujaChkOut
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error)); 
  }
 

exports.pujaChkOutList = async (req, res) => {
    await PujaChkOut.find().populate("userid").populate("pujaId").populate("productId")
    .populate({
        path: "product",
        populate: {
          path: "productId",
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
  