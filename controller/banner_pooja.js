const PoojaBanner = require("../models/banner_pooja");
//const HomeBanner = require("../models/home_banner.js");

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


exports.add_PoojaBanner = async (req, res) => {
  //console.log(req.body);
  const { title} = req.body;

  const newPoojaBanner = new PoojaBanner({
    title: title,
    
    
  });

    const findexist = await PoojaBanner.findOne({
      title:title,
    });
    if (findexist) {
        resp.alreadyr(res);
    } else {
        if (req.files) {
            if (req.files.img[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.img.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.img[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.img[i].path);
                alluploads.push(resp.secure_url);
              }
              newPoojaBanner.img = alluploads;
            }
          }
          newPoojaBanner.save()
      
      
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
        };
};


 

exports.get_PoojaBanner = async (req, res) => {
  await PoojaBanner.find()
  .sort({ sortorder: 1 })
  .then((data) => resp.successr(res, data))
  .catch((error) => resp.errorr(res, error));
  };

 

exports.viewone_PoojaBanner = async (req, res) => {
await await PoojaBanner.findOne({ _id: req.params.id })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

 

exports.del_PoojaBanner = async (req, res) => {
    await PoojaBanner.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };


exports.edit_PoojaBanner = async(req,res)=>{
    const{bannrId,bannerPage} = req.body
    await PoojaBanner.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: req.body },
        { new: true }
      )    

        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };


   

  