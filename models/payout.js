const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      astroId:{
        type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
      },
      payout_amt:{ type: Number },
      transactionId:{
        type: String, 
       },
       status:{
        type:String
       },
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("payout", thisSchema);

//alltrade notification