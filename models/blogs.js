const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    blog_title: {
      type: String,
    },
    blogcategory: { type: mongoose.Schema.Types.ObjectId, ref: "blogcategory" },
    blogImg: {
      type: Array,
    },

    desc: {
      type: String,
      //default: "Active",
    },
    status: {
      type: String,
      default: "Active",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("blog", thisSchema);
