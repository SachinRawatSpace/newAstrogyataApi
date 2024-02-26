const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {
    //   fullname: Joi.string()
    // //  .alphanum()
    //   .min(3)
    //   //.max(30)
    //   .required(),
    fullname: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    //  Joi.string()
    //  .required(),
    password: {
      type: String,
    },
    cnfmPassword: {
      type: String,
    },
    img: {
      type: Array,
      default:
        "https://res.cloudinary.com/dc7hzwpbm/image/upload/v1665055219/pngtree.jpg",
    },

    otp: { type: String },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    primary_skills: {
      type: String,
    },
    all_skills: {
      type: String,
    },
    language: {
      type: String,
    },
    exp_in_years: {
      type: Number,
    },
    conrubute_hrs: {
      type: String,
    },
    hear_abt_astrology: {
      type: String,
    },
    other_online_platform: {
      type: String,
      //yes ,no
    },
    why_onboard_you: {
      type: String,
    },
    suitable_tym_interview: {
      type: String,
    },
    crnt_city: {
      type: String,
    },
    income_src: {
      type: String,
    },
    highest_qualification: {
      type: String,
    },
    degree_deploma: {
      type: String,
    },
    clg_scl_name: {
      type: String,
    },
    lrn_abt_astrology: {
      type: String,
    },
    insta_link: {
      type: String,
    },
    fb_link: {
      type: String,
    },
    linkedln_link: {
      type: String,
    },
    youtube_link: {
      type: String,
    },
    website_link: {
      type: String,
    },
    anybody_prefer: {
      type: String,
    },
    min_earning_expe: {
      type: String,
    },
    max_earning_expe: {
      type: String,
    },

    long_bio: {
      type: String,
    },
    status: {
      type: String,
      default: "Offline",
    },
    callingStatus: {
      type: String,
      default: "Available",
    },
    callCharge: {
      type: Number,
    },
    otpverify: {
      type: String,
      //type: String,
      default: "false",
    },
    approvedstatus: {
      type: String,
      //type: String,
      default: "false",
    },
    avg_rating: {
      type: Number,
      default: 0,
    },
    waiting_queue: {
      type: Number,
      default: 0,
    },
    waitQueue: Array,
    waiting_tym: {
      type: Number,
      default: 0,
    },
    // availability: [{
    //   type: String,
    // }],
    min_amount: {
      type: Number,
    },
    max_amount: {
      type: Number,
    },
    // availability: {
    //   type: Object, default: {
    monday: { type: Array },
    tuesday: { type: Array },
    wednesday: { type: Array },
    thursday: { type: Array },
    friday: { type: Array },
    saturday: { type: Array },
    sunday: { type: Array },
    channelName: {
      type: String,
    },
    totalEarning: [
      {
        amount: {
          type: Number,
          default: 0,
        },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    ownamount: {
      type: Number,
    },
    availableAmt: {
      type: Number,
      default: 0
    },
    specification: {
      type: String,
    },


  },

  { timestamps: true }
);

module.exports = mongoose.model("astrologer", thisSchema);
