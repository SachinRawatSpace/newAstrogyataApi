const Astroproduct = require("../models/astroproduct");
const resp = require("../helpers/apiResponse");
const Product = require("../models/product");

const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.add_astro_product = async (req, res) => {
  const { astroid, product, category, desc, price } = req.body;

  const newAstroproduct = new Astroproduct({
    astroid: astroid,
    product: product,
    category: category,
    price: price,
    desc: desc
  });

  newAstroproduct.save()
    .then((data) => {
      resp.successr(res, data);
      Astroproduct.findOne({ product: product }).populate("product")
        .then((getpp) => {
          console.log(getpp)
          let qqcntt = getpp.product;

          console.log("qqcntt", qqcntt.qsCount)
          // qqcntt++; // Update qqcntt parameter
          Astroproduct.findOneAndUpdate(
            { _id: data._id },
            { $set: { qsCount: qqcntt.qsCount } },
            { new: true }
          )
            .then((hhy) => {
              console.log("hhy", hhy);
            })
            .catch((error) => {
              console.error("Error updating Astroproduct:", error);
            });
        })
        .catch((error) => {
          console.error("Error finding Astroproduct:", error);
        });
    })
    .catch((error) => resp.errorr(res, error));
};



exports.product_consltnt_list = async (req, res) => {

  const getdata = await Astroproduct.find({ product: req.params.id }).populate("astroid").populate("product").populate("category")

    //console.log("get1product",get1product)



    .sort({ sortorder: -1 })
    .then((data) => resp.successr(res, data))

    .catch((error) => resp.errorr(res, error));
  let getproduct = await Astroproduct.findOne({ product: req.params.id }).sort({ "price": 1 }).limit(1)
  //console.log("product",getproduct)
  let minPrice = getproduct.price
  let get1product = getproduct.product
  //console.log("getdata",getdata)
  const data = await Product.findOneAndUpdate(
    {
      _id: get1product,
    },
    { $set: { price: minPrice } },
    { new: true }
  )
  //console.log("data",data)
};
exports.productlist = async (req, res) => {
  await Astroproduct.find({
    astroid: req.params.id
  }).populate("astroid").populate("product").populate("category")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.astro_product_list = async (req, res) => {
  await Astroproduct.find().populate("astroid").populate("product").populate("category")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.del_astro_product = async (req, res) => {
  await Astroproduct.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.added_product_byastro = async (req, res) => {
  await Astroproduct.find({ product: req.params.id }).populate("astroid").populate("product").populate("category")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.productbycategory = async (req, res) => {
  await Astroproduct.find({ category: req.params.id }).populate("category")
    .sort({ sortorder: 1 }).populate("product")

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


