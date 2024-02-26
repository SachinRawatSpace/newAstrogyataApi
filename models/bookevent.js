const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    event_list: {
      type: String,
    },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    date: {
      type: String,
    },
    country:{
        type: String,
    },
    state:{
        type: String,
    },
    city:{
        type: String,
    },
    time_slot:{
        type: String,
    },
    orderNote:{
        type: String,
    },
    email:{
        type: String,
    },
   mobile:{
    type: Number,
   },
   orderId:{
    type: String,

   },
   paymentId:{
    type: String,

   },
   signatureId:{
    type: String,

   }
   },
  { timestamps: true }
);

module.exports = mongoose.model("bookevent", thisSchema);
