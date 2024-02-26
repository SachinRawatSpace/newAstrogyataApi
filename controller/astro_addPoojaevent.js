const AstroPoojaEvent = require("../models/astro_addPoojaevent");
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


exports.add_astro_poojaEvent = async (req, res) => {
    //console.log(req.body);
    const { astroid, selectedPooja, pooja_price, offer, duration, location_of_pooja, fullfill_location, availablity_time } = req.body;

    const newAstroPoojaEvent = new AstroPoojaEvent({
        astroid: astroid,
        selectedPooja: selectedPooja,
        offer: offer,
        duration: duration,
        pooja_price: pooja_price,
        location_of_pooja: location_of_pooja,
        fullfill_location: fullfill_location,
        availablity_time: availablity_time

    });


    if (req.files) {
        if (req.files.pooja_img[0].path) {
            alluploads = [];
            for (let i = 0; i < req.files.pooja_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                    req.files.pooja_img[i].path,
                    { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.pooja_img[i].path);
                alluploads.push(resp.secure_url);
            }
            newAstroPoojaEvent.pooja_img = alluploads;
        }
    }
    newAstroPoojaEvent.save()


        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
};

exports.astro_pooja_list = async (req, res) => {

    const getdata = await AstroPoojaEvent.find({ product: req.params.id }).populate("astroid").populate("product").populate("category")

        //console.log("get1product",get1product)



        .sort({ sortorder: -1 })
        .then((data) => resp.successr(res, data))

        .catch((error) => resp.errorr(res, error));
    let getproduct = await Astroproduct.findOne({ product: req.params.id }).sort({ "price": 1 }).limit(1)
    // console.log("product", getproduct)
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

exports.astro_pooja_list = async (req, res) => {
    await AstroPoojaEvent.find({
    }).populate("astroid").populate("selectedPooja")
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




