const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {

    // userid:{
    //   type: mongoose.Schema.Types.ObjectId, ref: "user"
    // },
    shipping_address: { type: mongoose.Schema.Types.ObjectId, ref: "shipping_address" },
    // customer: { type: String },

    astroId: { type: mongoose.Schema.Types.ObjectId, ref: "astrologer" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },



    productid: { type: mongoose.Schema.Types.ObjectId, ref: "consultant" },
    gst: {
      type: Number,
    },
    // product_qty: {
    //   type: Number,
    // },
    orderId: {
      type: String,
    },
    // gstotal:{
    //   type: Number,
    //  // default:0  
    // },
    total_amt: {
      type: Number,
      // default:0
    },
    status: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", CartSchema);
//console.log()