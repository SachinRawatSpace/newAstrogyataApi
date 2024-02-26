const ProductCat = require("../models/productcategory");
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


exports.addProductcategory  = async (req, res) => {
  //console.log(req.body);
  const { name, img,desc, status } = req.body;

  const newProductCat = new ProductCat({
    //astroId:astroId,
    name:name,
    img:img,
    desc:desc,
    status:status
  });

  
    const findexist = await ProductCat.findOne({ name: name });
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
              newProductCat.img = alluploads;
            }
          }
          newProductCat.save()
      
      
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
        };
};

exports.getproductcalegory = async (req, res) => {
await ProductCat.find()
.sort({ sortorder: 1 })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.viewonePdctCategory = async (req, res) => {
await ProductCat.findOne({ _id: req.params.id })
.then((data) => resp.successr(res, data))
.catch((error) => resp.errorr(res, error));
};

exports.delpdctCategory = async (req, res) => {
    await ProductCat.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };

 


 
exports.editProductCategory = async(req,res)=>{
    const{name,img,desc,status} = req.body
    
    data ={}
    if(name) {
        data.blog_title = blog_title
    }
    if(status){
      data.status = status
    }
    if(desc){
        data.desc = desc
    }
  
    if (req.files) {
        if (req.files.img) {
          alluploads = [];
          for (let i = 0; i < req.files.img.length; i++) {
            // console.log(i);
            const resp = await cloudinary.uploader.upload(req.files.img[i].path, {
              use_filename: true,
              unique_filename: false,
            });
            fs.unlinkSync(req.files.img[i].path);
            alluploads.push(resp.secure_url);
          }
          // newStore.storeImg = alluploads;
          data.img = alluploads;
        }
     }
     await ProductCat.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };