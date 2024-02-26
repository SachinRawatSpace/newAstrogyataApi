const Astrologer = require("../models/astrologer");
const Joi = require("joi");
const resp = require("../helpers/apiResponse");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
const { data } = require("jquery");
const AdminComision = require("../models/admin");
const User = require("../models/users");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.signup = async (req, res) => {
  const { fullname, mobile, email } = req.body;
  let length = 6;
  let defaultotp = "123456";

  const newAstrologer = new Astrologer({
    fullname: fullname,
    mobile: mobile,
    email: email,
    otp: defaultotp,
  });

  let findexist = await Astrologer.findOne({ mobile: mobile });
  if (findexist) {
    if (findexist.mobile == null) {
      //  console.log("error")
      var resData = {
        status: false,
        message: "Validation error",

        error: "error",
      };

      return res.status(201).json(resData);
    } else if (findexist.mobile) {
      // console.log("success")
      res.json({
        status: "success",
        msg: "Welcome Back Otp send successfully",
        mobile: findexist.mobile,
        otp: defaultotp,
        _id: findexist?._id,
      });
    }
  } else {
    newAstrologer
      .save()

      .then((data) => {
        res.json({
          status: "success",
          msg: "Otp send successfully",
          registered: data?.mobile,
          _id: data?._id,
          otp: defaultotp,
        });
      })
      .catch((error) => resp.errorr(res, error));
    // var resData = {
    //   status: false,
    //   message: "success",
    //   count: data.length,
    //   data: data,
    // };

    // return res.status(201).json(resData);

    //})
  }
};

exports.loginsendotp = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";
  const getuser = await Astrologer.findOne({ mobile: req.body.mobile });
  if (getuser?.approvedstatus == "true") {
    // console.log("STRING", getuser)
    res.status(200).send({
      status: true,
      msg: "otp Send Successfully",
      //otp: otp,
      _id: getuser._id,
      mobile: getuser.mobile,
    });
  } else if (getuser?.approvedstatus == "false") {
    res.status(200).json({
      status: true,
      msg: "Waiting for Admin Approval",
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "User doesn't Exist",
    });
  }
};

exports.getAstrologers = async (req, res) => {
  const specification = req.query.specification || "";
  let skills = req.query.skills || "";
  let languages = req.query.languages || "";
  let status = req.query.status || "";

  let astrologers = await Astrologer.find({
    specification: { $regex: specification, $options: "i" },
    status: { $regex: status, $options: "i" },
    all_skills: { $regex: skills, $options: "i" },
    language: { $regex: languages, $options: "i" },
  });

  const total = await Astrologer.countDocuments({
    specification: { $regex: specification, $options: "i" },
    status: { $regex: status, $options: "i" },
    all_skills: { $regex: skills, $options: "i" },
    language: { $regex: languages, $options: "i" },
  });

  const response = {
    status: true,
    "message": "success",
    "count": total,
    "data": astrologers,

  };


  res.status(200).json(response);
};

exports.astrosignup = async (req, res) => {
  const {
    fullname,
    email,
    mobile,
    password,
    cnfmPassword,
    img,
    gender,
    dob,
    primary_skills,
    all_skills,
    language,
    exp_in_years,
    conrubute_hrs,
    hear_abt_astrology,
    other_online_platform,
    why_onboard_you,
    suitable_tym_interview,
    crnt_city,
    income_src,
    highest_qualification,
    degree_deploma,
    clg_scl_name,
    lrn_abt_astrology,
    insta_link,
    fb_link,
    linkedln_link,
    youtube_link,
    website_link,
    anybody_prefer,
    min_earning_expe,
    max_earning_expe,
    long_bio,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newAstrologer = new Astrologer({
    fullname: fullname,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfmPassword: hashPassword,
    img: img,
    gender: gender,
    dob: dob,
    primary_skills: primary_skills,
    all_skills: all_skills,
    language: language,
    exp_in_years: exp_in_years,
    conrubute_hrs: conrubute_hrs,
    hear_abt_astrology: hear_abt_astrology,
    other_online_platform: other_online_platform,
    why_onboard_you: why_onboard_you,
    suitable_tym_interview: suitable_tym_interview,
    crnt_city: crnt_city,
    income_src: income_src,
    highest_qualification: highest_qualification,
    degree_deploma: degree_deploma,
    clg_scl_name: clg_scl_name,
    lrn_abt_astrology: lrn_abt_astrology,
    insta_link: insta_link,
    fb_link: fb_link,
    linkedln_link: linkedln_link,
    youtube_link: youtube_link,
    website_link: website_link,
    anybody_prefer: anybody_prefer,
    min_earning_expe: min_earning_expe,
    max_earning_expe: max_earning_expe,
    long_bio: long_bio,
  });

  const findexist = await Astrologer.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files) {
      if (req.files.img[0].path) {
        alluploads = [];
        for (let i = 0; i < req.files.img.length; i++) {
          const resp = await cloudinary.uploader.upload(req.files.img[i].path, {
            use_filename: true,
            unique_filename: false,
          });
          fs.unlinkSync(req.files.img[i].path);
          alluploads.push(resp.secure_url);
        }
        newAstrologer.img = alluploads;
      }
    }
    newAstrologer
      .save()

      .then((data) => resp.successr(res, data))
      .catch((error) => resp.errorr(res, error));
  }
};

exports.editAstroDetails = async (req, res) => {
  const {
    mobile,
    fullname,
    email,
    password,
    cnfmPassword,
    gender,
    dob,
    primary_skills,
    all_skills,
    language,
    exp_in_years,
    conrubute_hrs,
    hear_abt_astrology,
    other_online_platform,
    why_onboard_you,
    suitable_tym_interview,
    crnt_city,
    income_src,
    highest_qualification,
    degree_deploma,
    clg_scl_name,
    lrn_abt_astrology,
    insta_link,
    fb_link,
    linkedln_link,
    youtube_link,
    website_link,
    anybody_prefer,
    min_earning_expe,
    max_earning_expe,
    long_bio,
    status,
    callCharge,
    min_amount,
    max_amount,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    channelName,
  } = req.body;

  let data = {};
  if (mobile) {
    data.mobile = mobile;
  }
  if (fullname) {
    data.fullname = fullname;
  }
  if (channelName) {
    data.channelName = data.fullname;
  }
  if (email) {
    data.email = email;
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.password = hashPassword;
  }
  if (cnfmPassword) {
    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    data.cnfmPassword = hashPassword;
  }
  if (gender) {
    data.gender = gender;
  }
  if (dob) {
    data.dob = dob;
  }
  if (primary_skills) {
    data.primary_skills = primary_skills;
  }
  if (all_skills) {
    data.all_skills = all_skills;
  }
  if (language) {
    data.language = language;
  }
  if (exp_in_years) {
    data.exp_in_years = exp_in_years;
  }
  if (conrubute_hrs) {
    data.conrubute_hrs = conrubute_hrs;
  }
  if (hear_abt_astrology) {
    data.hear_abt_astrology = hear_abt_astrology;
  }
  if (other_online_platform) {
    data.other_online_platform = other_online_platform;
  }
  if (why_onboard_you) {
    data.why_onboard_you = why_onboard_you;
  }
  if (suitable_tym_interview) {
    data.suitable_tym_interview = suitable_tym_interview;
  }
  if (crnt_city) {
    data.crnt_city = crnt_city;
  }

  if (income_src) {
    data.income_src = income_src;
  }
  if (highest_qualification) {
    data.highest_qualification = highest_qualification;
  }
  if (degree_deploma) {
    data.degree_deploma = degree_deploma;
  }
  if (clg_scl_name) {
    data.clg_scl_name = clg_scl_name;
  }
  if (lrn_abt_astrology) {
    data.lrn_abt_astrology = lrn_abt_astrology;
  }
  if (insta_link) {
    data.insta_link = insta_link;
  }
  if (fb_link) {
    data.fb_link = fb_link;
  }
  if (linkedln_link) {
    data.linkedln_link = linkedln_link;
  }
  if (youtube_link) {
    data.youtube_link = youtube_link;
  }
  if (website_link) {
    data.website_link = website_link;
  }
  if (anybody_prefer) {
    data.anybody_prefer = anybody_prefer;
  }
  if (min_earning_expe) {
    data.min_earning_expe = min_earning_expe;
  }
  if (max_earning_expe) {
    data.max_earning_expe = max_earning_expe;
  }
  if (long_bio) {
    data.long_bio = long_bio;
  }
  if (status) {
    data.status = status;
  }
  if (monday) {
    data.monday = monday;
  }
  if (tuesday) {
    data.tuesday = tuesday;
  }
  if (wednesday) {
    data.wednesday = wednesday;
  }
  if (thursday) {
    data.thursday = thursday;
  }
  if (friday) {
    data.friday = friday;
  }
  if (saturday) {
    data.saturday = saturday;
  }
  if (sunday) {
    data.sunday = sunday;
  }

  if (min_amount) {
    data.min_amount = min_amount;
  }
  if (max_amount) {
    data.max_amount = max_amount;
  }
  if (callCharge) {
    data.callCharge = callCharge
    // data.callCharge = (parseInt(callCharge) * 25) / 100;
    // data.callCharge = parseInt(req.body.callCharge) + parseInt(data.callCharge);

  }
  // console.log("callCharge", data.callCharge)

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
  await Astrologer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.verifyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const getuser = await Astrologer.findOne({ mobile: mobile });
  if (getuser) {
    if (otp == "123456") {
      const token = jwt.sign(
        {
          astroId: getuser._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      );
      await Astrologer.findOneAndUpdate(
        {
          _id: getuser._id,
        },
        { $set: { otpverify: "true", status: "Online" } },
        { new: true }
      ).then((data) => {
        res.header("auth-adtoken", token).status(200).send({
          status: true,
          msg: "otp verified",
          otp: otp,
          _id: getuser._id,
          mobile: getuser.mobile,
          token: token,
        });
      });
    } else {
      res.status(200).json({
        status: false,
        msg: "Incorrect Otp",
      });
    }
  }
};

exports.loginVerify = async (req, res) => {
  const { mobile, otp } = req.body;
  const getuser = await Astrologer.findOne({ mobile: mobile });
  if (getuser) {
    if (otp == "123456") {
      const token = jwt.sign(
        {
          astroId: getuser._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      );
      //.then((data)=>{
      res.header("astro-token", token).status(200).send({
        status: true,
        msg: "otp verified",
        otp: otp,
        _id: getuser._id,
        mobile: getuser.mobile,
        email: getuser.email,
        fullname: getuser.fullname,
        token: token,
      });
      // });
    } else {
      res.status(200).json({
        status: false,
        msg: "Incorrect Otp",
      });
    }
  } else {
    res.status(200).json({
      status: false,
      msg: "User Doesn't exist",
    });
  }
};

exports.astrologin = async (req, res) => {
  const { email, mobile, password } = req.body;

  const user = await Astrologer.findOne({ mobile: mobile });

  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    // console.log("paaa", validPass)
    if (validPass) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        key,
        {
          expiresIn: 86400000,
        }
      );
      res.header("astro-token", token).status(200).send({
        status: true,
        token: token,
        _id: user._id,
        msg: "successfully Login",
        user: user,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "User Doesnot Exist",
      error: "error",
    });
  }
};

exports.viewoneAstro = async (req, res) => {
  await Astrologer.findOne({ _id: req.astroId })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getoneAstro = async (req, res) => {
  await Astrologer.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allAstro = async (req, res) => {
  await Astrologer.find({ "approvedstatus": "true" }).sort({ createdAt: -1 })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.admin_astrop_list = async (req, res) => {
  await Astrologer.find()
    .sort({ createdAt: -1 })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltAstro = async (req, res) => {
  await Astrologer.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updteApprovedsts = async (req, res) => {
  findone = await Astrologer.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { approvedstatus: req.body.approvedstatus } },
    { new: true }
  )
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "success",
        approvedstatus: data.approvedstatus,
      });
    })
    .catch((error) => resp.errorr(res, error));
};

exports.stafflogin = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  const { mobile, email, password } = req.body;

  // if(body('mobile')){
  //   console.log(body('mobile'))
  // }

  const staff = await Staff.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (staff) {
    //console.log(staff);
    if (staff.approvedstatus == true) {
      const validPass = await bcrypt.compare(password, staff.password);
      if (validPass) {
        const token = jwt.sign(
          {
            staffId: staff._id,
          },
          key,
          {
            expiresIn: "365d",
          }
        );
        res.header("ad-token", token).status(200).send({
          status: true,
          ad_token: token,
          msg: "success",
          staff: staff,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Incorrect Password",
          error: "error",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "Profile is under verification",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "Staff Doesnot Exist",
      error: "error",
    });
  }
};

exports.astrodetails = async (req, res) => {
  const getone = await Astrologer.findOne({ _id: req.params.id });
  if (getone) {
    res.status(200).json({
      status: true,
      msg: "success",
      Name: getone.fullname,
      Skills: getone.all_skills,
      language: getone.language,
      Exp: getone.exp_in_years,
      callCharge: getone.callCharge,
      about_me: getone.long_bio,
      img: getone.img,
    });
  }
};

exports.status_change = async (req, res) => {
  await Astrologer.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status, callingStatus: req.body.callingStatus, waiting_tym: 0 } },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.exp_high_to_low = async (req, res) => {
  await Astrologer.find()
    .sort({ exp_in_years: -1 })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.exp_low_to_high = async (req, res) => {
  await Astrologer.find()
    .sort({ exp_in_years: 1 })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.price_high_to_low = async (req, res) => {
  await Astrologer.find()
    .sort({ callCharge: -1 })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.price_low_to_high = async (req, res) => {
  await Astrologer.find()
    .sort({ callCharge: 1 })
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.rating_high_to_low = async (req, res) => {
  await Astrologer.find()
    .sort({ avg_rating: -1 })
    // .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.rating_low_to_high = async (req, res) => {
  await Astrologer.find()
    .sort({ avg_rating: 1 })
    //.sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  //  console.log("token", token)
  const decoded = jwt.verify(token, key);
  //  console.log("decoded", decoded)
  const astroId = decoded.astroId;
  //console.log("astroId", astroId)
  await Astrologer.findOneAndUpdate(
    {
      _id: astroId,
    },
    { $set: { status: "Offline", callingStatus: "Not available" } }
  );
  res.status(200).json({
    status: true,
    msg: "Logged out successfully",
  });
};


exports.astroCount = async (req, res) => {
  try {
    const count = await Astrologer.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.onlineAstroCount = async (req, res) => {
  try {
    const count = await Astrologer.countDocuments({ status: "Online" });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.offlineAstroCount = async (req, res) => {
  try {
    const count = await Astrologer.countDocuments({ status: "Offline" });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.busyAstroCount = async (req, res) => {
  try {
    const count = await Astrologer.countDocuments({ callingStatus: "Busy" });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};





exports.getWaitQueueList = async (req, res) => {
  const { id } = req.params;

  try {
    const astrologer = await Astrologer.findById(id).populate({
      path: "waitQueue.userId",
      select: "name email"
    });

    if (!astrologer) {
      return res.status(404).json({ error: "Astrologer not found" });
    }

    const waitQueueList = astrologer.waitQueue;
    const userList = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const { userId, callType, createdAt } of waitQueueList) {
      const user = await User.findById(userId);
      if (user) {
        userList.push({ value: { userId, callType, createdAt }, user });
      }
    }

    const filteredList = userList.filter(
      ({ value: { createdAt } }) =>
        new Date(createdAt).setHours(0, 0, 0, 0) === today.getTime()
    );

    //  console.log(filteredList);

    res.status(200).json({ waitQueueList: filteredList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch waitQueue list" });
  }
};


exports.deleteWaitQueueItem = async (req, res) => {
  const { astrologerId, userId } = req.params;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(404).json({ error: "Astrologer not found" });
    }

    const waitQueueList = astrologer.waitQueue;

    // Find the index of the waitQueue item based on the userId
    const indexToDelete = waitQueueList.findIndex(item => item.userId.toString() === userId);

    if (indexToDelete === -1) {
      return res.status(404).json({ error: "WaitQueue item not found" });
    }

    // Remove the waitQueue item from the array
    waitQueueList.splice(indexToDelete, 1);

    // Save the updated astrologer document
    await astrologer.save();

    res.status(200).json({ success: true, message: "WaitQueue item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete WaitQueue item" });
  }
};
