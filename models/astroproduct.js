const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    astroid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "astrologer",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "astromall"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productcategory"
    },
    price: {
      type: Number
    },

    desc: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
    qsCount:{
      type:Number,
      default:0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("consultant", thisSchema);
