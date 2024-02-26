const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    astroid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "astrologer",
    },
    From: {
      type: Number,
    },
    To: {
      type: Number,
    },
    Sid: {
      type: String,
    },
    ParentCallSid: {
      type: String,
    },
    DateCreated: {
      type: String,
    },
    DateUpdated: {
      type: String,
    },
    AccountSid: {
      type: String,
    },
    PhoneNumberSid: {
      type: String,
    },
    Status: {
      type: String,
    },
    StartTime: {
      type: String,
    },
    EndTime: {
      type: String,
    },
    Duration: {
      type: Number,
      default: 0
    },
    Price: {
      type: Number,
    },
    Direction: {
      type: String,
    },
    AnsweredBy: {
      type: String,
    },
    ForwardedFrom: {
      type: String,
    },
    CallerName: {
      type: String,
    },
    Uri: {
      type: String,
    },
    RecordingUrl: {
      type: String,
    },
    userdeductedAmt: {
      type: Number,
      default: 0
    },
    astroCredited: {
      type: Number,
      default: 0
    },
    adminCredited: {
      type: Number,
      default: 0
    },
    totalCredited: {
      type: Number,
      default: 0
    },
    userAmt: {
      type: Number,
      default: 0
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("call", thisSchema);

//alltrade notification
