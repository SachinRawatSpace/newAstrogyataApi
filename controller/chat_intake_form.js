const Intek = require("../models/chat_intake_form");
const intakeNotification = require("../models/intakeNotification");
const resp = require("../helpers/apiResponse");
const User = require("../models/users");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
const { data } = require("jquery");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.add_chat_intake = async (req, res) => {
  const { userid, astroid, gender, mobile, firstname, p_firstname, lastname, p_lastname, dob, p_dob, date_of_time, p_date_of_time, birthPlace, p_birthPlace, marital_status, occupation, topic_of_cnsrn, entertopic_of_cnsrn, type } = req.body;

  const newIntek = new Intek({
    userid: userid,
    astroid: astroid,
    mobile: mobile,
    firstname: firstname,
    p_firstname: p_firstname,
    lastname: lastname,
    p_lastname: p_lastname,
    dob: dob,
    p_dob: p_dob,
    date_of_time: date_of_time,
    p_date_of_time: p_date_of_time,
    birthPlace: birthPlace,
    p_birthPlace: p_birthPlace,
    gender: gender,
    marital_status: marital_status,
    occupation: occupation,
    topic_of_cnsrn: topic_of_cnsrn,
    entertopic_of_cnsrn: entertopic_of_cnsrn,
    type: type

  });
  const findone = await Intek.findOne({ userid: userid })
  if (findone) {
    await Intek.findOneAndUpdate(
      {
        userid: req.body.userid,
      },
      { $set: req.body },
      { new: true }
    )

    newIntek
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  } else {
    if (req.files) {
      if (req.files.file[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.file.length; i++) {
          const resp = await cloudinary.uploader.upload(
            req.files.file[i].path,
            { use_filename: true, unique_filename: false }
          );
          fs.unlinkSync(req.files.file[i].path);
          alluploads.push(resp.secure_url);
        }
        newIntek.file = alluploads;
      }
    }

    newIntek
      .save()
      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
}


exports.intekListByastro = async (req, res) => {
  await Intek.find({ astroid: req.params.id }).populate("userid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.get_chat_intake = async (req, res) => {
  await Intek.find().populate("userid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.getone_user_chatintek = async (req, res) => {
  await Intek.findOne({ userid: req.params.id }).populate("userid")
    //.populate("category").populate("rashiId")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getone_chatintek = async (req, res) => {
  await Intek.findOne({ _id: req.params.id }).populate("userid")
    //.populate("category").populate("rashiId")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.edit_ChatIntake = async (req, res) => {
  try {
    const { userid, astroid, gender, mobile, firstname, p_firstname, lastname, p_lastname, dob, p_dob, date_of_time, p_date_of_time, birthPlace, p_birthPlace, marital_status, occupation, topic_of_cnsrn, entertopic_of_cnsrn } = req.body

    let data = {}
    if (userid) {
      data.userid = userid
    }
    if (astroid) {
      data.astroid = astroid
    }
    if (gender) {
      data.gender = gender
    }
    if (mobile) {
      data.mobile = mobile
    }
    if (firstname) {
      data.firstname = firstname
    }
    if (p_firstname) {
      data.p_firstname = p_firstname
    }
    if (lastname) {
      data.lastname = lastname
    }
    if (p_lastname) {
      data.p_lastname = p_lastname
    }

    if (dob) {
      data.dob = dob
    }
    if (p_dob) {
      data.p_dob = p_dob
    }
    if (date_of_time) {
      data.date_of_time = date_of_time
    }
    if (p_date_of_time) {
      data.p_date_of_time = p_date_of_time
    }
    if (birthPlace) {
      data.birthPlace = birthPlace
    }
    if (p_birthPlace) {
      data.p_birthPlace = p_birthPlace
    }
    if (gender) {
      data.gender = gender
    }
    if (marital_status) {
      data.marital_status = marital_status
    }
    if (occupation) {
      data.occupation = occupation
    }
    if (entertopic_of_cnsrn) {
      data.entertopic_of_cnsrn = entertopic_of_cnsrn
    }

    if (req.files) {
      if (req.files.file) {
        alluploads = [];
        for (let i = 0; i < req.files.file.length; i++) {
          // console.log(i);
          const resp = await cloudinary.uploader.upload(req.files.file[i].path, {
            use_filename: true,
            unique_filename: false,
          });
          fs.unlinkSync(req.files.file[i].path);
          alluploads.push(resp.secure_url);
        }
        // newStore.storeImg = alluploads;
        data.file = alluploads;
      }
    }
    const getu = await Intek.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    )
    res.status(200).json({
      msg: "success",
      data: getu
    })
    // .then((data) => resp.successr(res, data))
    // .catch((error) => resp.errorr(res, error));
  } catch (error) {
    //  console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


exports.dlt_ChatIntek = async (req, res) => {
  await Intek.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.intekListByUser = async (req, res) => {
  await Intek.find({ userid: req.params.id }).populate("userid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.intekListforApp = async (req, res) => {
  await Intek.find({ userid: req.params.id }).populate("userid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.intekListforCall = async (req, res) => {
  await Intek.find({ userid: req.params.id }).populate("userid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.intekListforVideo = async (req, res) => {
  await Intek.find({ userid: req.params.id }).populate("userid")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};



exports.selectIntakeForm = async (req, res) => {
  const { chatIntekId, userId, astroId } = req.body;

  const newintakeNotification = new intakeNotification({
    chatIntekId: chatIntekId,
    userId: userId,
    astroId: astroId
  });

  newintakeNotification
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}
exports.intetakeNotification = async (req, res) => {
  await intakeNotification.find().populate("userId").populate("chatIntekId").populate("astroId")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};