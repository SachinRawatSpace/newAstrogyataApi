const Shipping = require("../models/shipping_adrss");
const resp = require("../helpers/apiResponse");

exports.add_shipping_address = async (req, res) => {
  const { userid, alt_mobile,flat_no,locality, city, state,country,pincode,landmark,mobile,name,email } = req.body;

  const newShipping = new Shipping({
    userid: userid,
    name: name,
    mobile:mobile,
    alt_mobile: alt_mobile,
    email:email,
    flat_no: flat_no,
    locality: locality,
    city:city,
    state: state,
    country:country,
    pincode:pincode,
    landmark:landmark,
    mobile:mobile,
    name:name,
    email:email
  });

  newShipping.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "error",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Added new address",
        data: newShipping,
      });
    }
  });
};

exports.viewone_address  = async (req, res) => {
    const findall = await Shipping.find({ userid: req.params.id })
    .sort({ sortorder: 1 })
    .populate("userid");
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
}


exports.getone_address  = async (req, res) => {
  const findall = await Shipping.find({ _id: req.params.id })
  .sort({ sortorder: 1 })
  .populate("userid");
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
}

exports.all_shipping_address = async (req, res) => {
  const findall = await Shipping.find({ customer: req.userId })
    .sort({ sortorder: 1 })
    .populate("customer");
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

exports.viewoneuseraddress = async (req, res) => {
  const findone = await Useraddress.findOne({ customer: req.userId }).populate("customer")
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "Add New Address",
      error: "error",
    });
  }
};

exports.edit_address = async (req, res) => {
  //console.log = req.body;
  const findandUpdateEntry = await Shipping.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  )
  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      status: "error",
      error: "error",
    });
  }
};


exports.dlt_address = async (req, res) => {
  await Shipping.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
}