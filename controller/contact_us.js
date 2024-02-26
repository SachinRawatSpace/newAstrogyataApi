const Contactus = require("../models/contact_us");
const resp = require("../helpers/apiResponse");

exports.add_contactus= async (req, res) => {
  const {userid, name,email,subject,msg} = req.body;

  const newContactus = new Contactus({
    userid:userid,
    name:name,
    email:email,
    subject:subject,
    msg:msg,
    
   });
//   const findexist = await Contactus.findOne({ name: desc });
//   if (findexist) {
//     resp.alreadyr(res);
//   } else {
    newContactus
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error)); 
  }


exports.getContactus = async (req, res) => {
    await Contactus.find()
      .sort({ sortorder: 1 })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };

  exports.getoneContactus = async (req, res) => {
    await Contactus.findOne({ _id: req.params.id })
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.editContactus = async (req, res) => {
    await Contactus.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  

  exports.dltContactus = async (req, res) => {
    await Contactus.deleteOne({ _id: req.params.id })
      .then((data) => resp.deleter(res, data))
      .catch((error) => resp.errorr(res, error));
  };
  