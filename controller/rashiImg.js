const RashiImg = require("../models/rashiImg");
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


exports.addRashiImg  = async (req, res) => {
  //console.log(req.body);
  const { rashi,rashiImg,desc } = req.body;

  const newRashiImg = new RashiImg({
     
    rashi:rashi,
    rashiImg:rashiImg,
    desc:desc,
     
  });

  
    const findexist = await RashiImg.findOne({rashi:rashi});
    if (findexist) {
        resp.alreadyr(res);
    } else {
        if (req.files) {
            if (req.files.rashiImg[0].path) {
              alluploads = [];
              for (let i = 0; i < req.files.rashiImg.length; i++) {
                const resp = await cloudinary.uploader.upload(
                  req.files.rashiImg[i].path,
                  { use_filename: true, unique_filename: false }
                );
                fs.unlinkSync(req.files.rashiImg[i].path);
                alluploads.push(resp.secure_url);
              }
              newRashiImg.rashiImg = alluploads;
            }
          }
          newRashiImg.save()
      
      
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
        };
};

exports.getRashiImg = async (req, res) => {
await RashiImg.find() 
.sort({ sortorder: 1 })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.viewoneRashiImg = async (req, res) => {
await RashiImg.findOne({ _id: req.params.id })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.delRashiImg = async (req, res) => {
    await RashiImg.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  }

  
exports.editRashiImg = async(req,res)=>{
    const{rashi,rashiImg,desc} = req.body
    
    data ={}
    if(rashi) {
        data.rashi = rashi
    }
    if(desc){
        data.desc = desc
    }
  
    if (req.files) {
        if (req.files.rashiImg) {
          alluploads = [];
          for (let i = 0; i < req.files.rashiImg.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(req.files.rashiImg[i].path, {
              use_filename: true,
              unique_filename: false,
            });
            fs.unlinkSync(req.files.rashiImg[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.rashiImg = alluploads;
        }
     }
     await RashiImg.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };