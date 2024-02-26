const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    astroid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "astrologer",
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    type: {
      type: String
    },
    status: {
      type: String
    },
    bundleOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consultant",
    },
    view_button: {
      type: String,
      default: "true"
    },
    remaining_qus: {
      type: Number,

    },
    totalQus: {
      type: Number,
      default: 0
    },
    

  },
  { timestamps: true }
);

module.exports = mongoose.model("Askqus", thisSchema);
