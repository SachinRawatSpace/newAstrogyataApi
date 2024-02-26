const User = require("../models/users");
const resp = require("../helpers/apiResponse");
//const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const key = "verysecretkey";
const bcrypt = require("bcrypt");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.usersignup = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";
  const { fullname, userimg, email, mobile, dob, gender, birth_tym, city, bithplace, password, cnfmPassword } =
    req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    fullname: fullname,
    password: hashPassword,
    cnfmPassword: hashPassword,
    email: email,
    mobile: mobile,
    userimg: userimg,
    dob: dob,
    birth_tym: birth_tym,
    bithplace: bithplace,
    city: city,
    gender: gender,
    otp: defaultotp
  });

  const findexist = await User.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    resp.alreadyr(res);
  } else {
    if (req.files && req.files.userimg && req.files.userimg.length > 0) {
      alluploads = [];
      for (let i = 0; i < req.files.userimg.length; i++) {
        const resp = await cloudinary.uploader.upload(
          req.files.userimg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.userimg[i].path);
        alluploads.push(resp.secure_url);
      }
      newUser.userimg = alluploads;
    }

    newUser.save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "otp send successfully",
          data: data.mobile,
          otp: data.otp,
          _id: data?._id,
        });
      })
      .catch((error) => resp.errorr(res, error));
  }
}

exports.userVryfyotp = async (req, res) => {
  const { mobile, otp } = req.body;
  const getuser = await User.findOne({ mobile: mobile })
  if (getuser) {
    if (otp == "123456") {
      const token = jwt.sign(
        {
          userId: getuser._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      );
      await User.findOneAndUpdate(
        {
          _id: getuser._id,
        },
        { $set: { walletId: getuser._id } },
        { new: true }).then((data) => {

          res.header("auth-token", token).status(200).send({
            status: true,
            msg: "otp verified",
            otp: otp,
            //  data:data,
            token: token,
            // _id: getuser._id,

            data: data,
            walletId: data.walletId,
          })
        })
    } else {
      res.status(200).json({
        status: false,
        msg: "Incorrect Otp",
      });
    }
  }
};


exports.getoneuserdetail = async (req, res) => {
  const getone = await User.findOne({ _id: req.params.id })

  if (getone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: getone
    })
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error"
    })
  }
}



exports.loginWithPassword = async (req, res) => {
  const { email, mobile, password } = req.body

  const user = await User.findOne({
    mobile: mobile
  });
  //console.log("Strrr", user)
  if (user) {
    const validPass = await bcrypt.compare(req.body.password, user.password)
    // console.log("paaa", validPass)
    if (validPass) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      )
      res.header("auth-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
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



exports.edit_myprofile = async (req, res) => {
  const { fullname, userimg, email, mobile, password, cnfmPassword, birth_tym, dob, bithplace, address, city, state, country, pincode, gender } = req.body

  data = {}
  if (fullname) {
    data.fullname = fullname
  }

  if (email) {
    data.email = email
  }
  if (mobile) {
    data.mobile = mobile
  }
  if (gender) {
    data.gender = gender
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
  if (birth_tym) {
    data.birth_tym = birth_tym
  }
  if (dob) {
    data.dob = dob
  }
  if (bithplace) {
    data.bithplace = bithplace
  }
  if (address) {
    data.address = address
  }
  if (city) {
    data.city = city
  }
  if (state) {
    data.state = state
  }
  if (country) {
    data.country = country
  }
  if (pincode) {
    data.pincode = pincode
  }

  if (req.files) {
    if (req.files.userimg) {
      alluploads = [];
      for (let i = 0; i < req.files.userimg.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(req.files.userimg[i].path, {
          use_filename: true,
          unique_filename: false,
        });
        fs.unlinkSync(req.files.userimg[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.userimg = alluploads;
    }
  }
  await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: data },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.viewoneuser = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};
exports.getoneusertoken = async (req, res) => {
  await User.findOne({ _id: req.userId })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.alluser = async (req, res) => {
  await User.find()
    .sort({ sortorder: 1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.dltuser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.userlogin = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";
  const getuser = await User.findOne({ mobile: req.body.mobile });
  if (getuser) {
    console.log("STRING", getuser)
    res.status(200).send({
      status: true,
      msg: "otp Send Successfully",
      otp: defaultotp,
      // _id: getuser._id,
      // mobile: getuser.mobile,
      // approvedstatus: getuser.approvedstatus
    })
  } else if (!getuser) {
    res.status(400).json({
      status: true,
      msg: "User doesn't Exist",
    });
  }
};

exports.shipping_address = async (req, res) => {
  await User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};






exports.resetPassword = async (req, res) => {
  const { oldpassword, password, cnfrmPassword } = req.body
  const userData = await User.findOne({ _id: req.params.id })
  if (userData) {
    const passwordMatch = await bcrypt.compare(oldpassword, userData.password)
    if (passwordMatch) {

      //console.log("matched")
      if (password === cnfrmPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const findandUpdateEntry = await User.findOneAndUpdate(
          {
            _id: req.params.id
          },
          { $set: { password: hashPassword, cnfrmPassword: hashPassword } },
          { new: true }
        );
        if (findandUpdateEntry) {
          res.status(200).json({
            status: true,
            msg: "success",
            data: findandUpdateEntry,
          });

        }
      } else {
        res.status(401).json({
          status: false,
          msg: "Password confirm password not matched"

        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "Old Password not matched",

      })
    }

  }
};


exports.forget_sendotp = async (req, res) => {
  let length = 6;
  let defaultotp = "123456";
  const getuser = await User.findOne({ mobile: req.body.mobile });
  if (getuser) {
    //console.log("STRING", getuser)
    res.status(200).send({
      status: true,
      msg: "otp Send Successfully",
      //otp: otp,
      _id: getuser._id,
      mobile: getuser.mobile
    })
  } else {
    res.status(400).json({
      status: false,
      msg: "User doesn't Exist"
    })
  }
};



exports.forget_verify = async (req, res) => {
  const { mobile, otp } = req.body;
  const getuser = await User.findOne({ mobile: mobile })
  if (getuser) {
    if (otp == "123456") {
      const token = jwt.sign(
        {
          userId: getuser._id,
        },
        key,
        {
          expiresIn: "365d",
        }
      )
      //.then((data)=>{ 
      res.header("auth-token", token).status(200).send({
        status: true,
        msg: "otp verified",
        otp: otp,
        _id: getuser._id,
        mobile: getuser.mobile,
        token: token
      })
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
}

exports.fogetpassword = async (req, res) => {

  const { password, cnfmPassword } = req.body

  //  const salt = await bcrypt.genSalt(10);
  //  const hashPassword = await bcrypt.hash(password, salt);
  //  const hashPassword1 = await bcrypt.hash(cnfrmPassword, salt)

  // const validPass = String.compare(req.body.password, req.body.cnfrmPassword);
  // console.log("Result",validPass)
  if (password === cnfmPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const findandUpdateEntry = await User.findOneAndUpdate(
      {
        _id: req.params.id
      },
      { $set: { password: hashPassword, cnfmPassword: hashPassword } },
      { new: true }
    );
    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "Password not matched",
    })
  }
};

exports.userCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.activeUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ status: "Active" });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.inActiveUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ status: "Inactive" });
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};