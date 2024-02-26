const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       hrscp_category:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "hrscpCategory",
       },
      //  rashiId:{
      //   type: mongoose.Schema.Types.ObjectId,
      // ref: "rashi",
      //  },
       desc:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("Horoscope", thisSchema);
