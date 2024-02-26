const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    banner_title: {
      type: String,
    },
    banner_img: {
      type: Array,
    },
    // bannertype: {
    //   type: String,
    // },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("homeBanner", thisSchema);
