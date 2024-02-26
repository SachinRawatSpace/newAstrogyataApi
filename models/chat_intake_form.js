const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      //  required:true
    },
    astroid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "astrologer",
    },
    gender: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    p_firstname: {
      type: String,
      default: ""
    },

    lastname: {
      type: String,
      
    },
    p_lastname: {
      type: String,
      default: ""
    },
    dob: {
      type: String,
      required: true
    },
    p_dob: {
      type: String,
      default: ""
    },
    date_of_time: {
      type: String,
      required: true
    },
    p_date_of_time: {
      type: String,
      default: ""
    },
    birthPlace: {
      type: String,
      required: true
    },
    p_birthPlace: {
      type: String,
      default: ""
    },
    marital_status: {
      type: String,
      required: true
    },
    //Single , Married ,Divorced ,Separated ,Widowed
    occupation: {
      type: String,
      required: true
    },
    // Private Sector ,Govt Sector ,Business/Self Employed ,Civil Services ,Defence  ,Not Working ,Student
    topic_of_cnsrn: {
      type: String,
      required: true
    },
    // Career and Business ,Marriage ,Love and Relationship ,Wealth and Property ,Education ,Legal Matters ,Child Name Consultation ,Business Name Consultation ,Gem Stone Consultation ,Commodity trading consultation ,Match making ,Birth Time Rectification ,Name Correction Consultation,Travel Abroad Consulation ,Remedy Consultation ,Health Consultation ,Others
    entertopic_of_cnsrn: {
      type: String,
      //  required:true
    },
    file: {
      type: Array
    },
    type: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("intakeform", thisSchema);
