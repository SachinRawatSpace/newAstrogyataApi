const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {

    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number
    },
    password: {
      type: String,
    },
    cnfmPassword: {
      type: String,
    },
    userimg: {
      type: Array,
    },
    birth_tym: {
      type: String,
    },
    dob: { type: String },
    otp: { type: String },
    alt_mobile: {
      type: String,
    },
    bithplace: {
      type: String,
      default: ""
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: String,
    },

    walletId: {
      type: String
    },
    amount: {
      type: Number,
      default: 0,
    },
    oldpassword: {
      type: String
    },
    deductedAmt: {
      type: Number
    },
    gender: {
      type: String
    },
    status: {
      type: String,
      default: "Active"
    }

  },




  { timestamps: true }
);


module.exports = mongoose.model("user", thisSchema);
