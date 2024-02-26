const Banner = require("../models/banner");
const HomeBanner = require("../models/home_banner.js");

const resp = require("../helpers/apiResponse");

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


exports.addbanner = async (req, res) => {
  //console.log(req.body);
  const { banner_title, banner_img, status, root} = req.body;

  const newBanner = new Banner({
    banner_title: banner_title,
    banner_img: banner_img,
     status: status,
     root:root
   
  });

    const findexist = await Banner.findOne({
      banner_title: banner_title,
    });
    if (findexist) {
        resp.alreadyr(res);
    } else {
        if (req.files) {
            if (req.files.banner_img[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.banner_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.banner_img[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.banner_img[i].path);
                alluploads.push(resp.secure_url);
              }
              newBanner.banner_img = alluploads;
            }
          }
          newBanner.save()
      
      
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
        };
};

exports.add_home_banner = async (req, res) => {
  //console.log(req.body);
  const { banner_title, banner_img, status } = req.body;

  const newHomeBanner = new HomeBanner({
    banner_title: banner_title,
    banner_img: banner_img,
     status: status,
  });

    const findexist = await HomeBanner.findOne({
      banner_title: banner_title,
    });
    if (findexist) {
        resp.alreadyr(res);
    } else {
        if (req.files) {
            if (req.files.banner_img[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.banner_img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.banner_img[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.banner_img[i].path);
                alluploads.push(resp.secure_url);
              }
              newHomeBanner.banner_img = alluploads;
            }
          }
          newHomeBanner.save()
      
      
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
        };
};

exports.get_home_banner = async (req, res) => {
  await HomeBanner.find({status:"Active"}) 
  .sort({ sortorder: 1 })
  .then((data) => resp.successr(res, data))
  .catch((error) => resp.errorr(res, error));
  };

exports.getbanner = async (req, res) => {
await Banner.find() 
.sort({ sortorder: 1 })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.viewonebanner = async (req, res) => {
await Banner.findOne({ _id: req.params.id })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

 

exports.delbanner = async (req, res) => {
    await Banner.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

exports.getbannerbytype = async (req, res) => {
  const findall = await Banner.find({ banner_title: req.params.id }).sort({
    sortorder: 1,
  });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};



 
exports.editBanner = async(req,res)=>{
    const{banner_title,banner_img,status} = req.body
    
    data ={}
    if(banner_title) {
        data.banner_title = banner_title
    }
    if(status){
        data.status = status
    }
  
    if (req.files) {
        if (req.files.banner_img) {
          alluploads = [];
          for (let i = 0; i < req.files.banner_img.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(req.files.banner_img[i].path, {
              use_filename: true,
              unique_filename: false,
            });
            fs.unlinkSync(req.files.banner_img[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.banner_img = alluploads;
        }
     }
     await Banner.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };


    exports.get_astromall_banner = async (req, res) => {
      await Banner.find( { $and: [{ banner_title: "astromall" }, { status:"Active"}]} )
     // find({status:"Active"}) 

      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
      };

  