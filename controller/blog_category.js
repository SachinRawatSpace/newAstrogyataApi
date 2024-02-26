const BlogCategory = require("../models/blog_category");
const resp = require("../helpers/apiResponse");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
exports.add_blog_category= async (req, res) => {
  const { name,desc,status} = req.body;

  const newBlogCategory = new BlogCategory({
    name:name,
    desc:desc,
    status:status
    
    
   });
   const findexist = await BlogCategory.findOne({ name: name });
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
          newBlogCategory.img = alluploads;
        }
      }
      newBlogCategory
       .save()
       .then((data) => resp.successr(res, data))
       .catch((error) => resp.errorr(res, error));
   }
 }
 

exports.all_blog_category = async (req, res) => {
    await BlogCategory.find()
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getone_blog_Cat = async (req, res) => {
    await BlogCategory.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.edit_blog_cat = async(req,res)=>{
    const{name,status,desc} = req.body
    
    data ={}
    if(name) {
        data.name = name
    }
    if(desc){
      data.desc = desc
  }
    if(status){
      data.status = status
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
     await BlogCategory.findOneAndUpdate(
        { _id: req.params.id},
        { $set: data },
        { new: true }
      )
        .then((data) => resp.successr(res, data))
        .catch((error) => resp.errorr(res, error));
    };
  

  exports.dlt_blog_cat = async (req, res) => {
    await BlogCategory.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.active_blog_category = async (req, res) => {
    await BlogCategory.find({status:"Active"})
      .sort({ createdAt: -1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };