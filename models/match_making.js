const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {

    // intakeId: {
    //   type: mongoose.Schema.Types.ObjectId, ref: "intakeform"
    // },
    userid: {
      type: mongoose.Schema.Types.ObjectId, ref: "user"
    },
    astroid: {
      type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
    },
    m_day: {
      type: Number,
    },
    m_month: {
      type: Number,
    },
    m_year: {
      type: Number,
    },
    m_hour: {
      type: Number,
    },

    m_min: {
      type: Number,
    },
    m_lat: {
      type: Number,
    },
    m_lon: {
      type: Number,
    },
    m_tzone: {
      type: Number,
    },
    f_day: {
      type: Number,
    },
    f_month: {
      type: Number,
    },
    f_year: {
      type: Number,
    },
    f_hour: {
      type: Number,
    },
    f_min: {
      type: Number,
    },
    f_lat: {
      type: Number,
    },
    f_lon: {
      type: Number,
    },
    f_tzone: {
      type: Number,
    },
    match_method: {
      type: String,
    },
    manglik_regional_setting: {
      type: String,
    },
    year: {
      type: Number,
    },
    month: {
      type: Number,
    },
    day: {
      type: Number,
    },
    hour: {
      type: Number,
    },
    min: {
      type: Number,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
    tzone: {
      type: Number,
    },
    seconds: {
      type: Number,
    },
    ayanamsha: {
      type: String,
    },
    sunrise: {
      type: String,
    },
    sunset: {
      type: String,
    },
    apiName: {
      type: String,
    },

  },

  { timestamps: true }
);


module.exports = mongoose.model("matchMaking", thisSchema);



