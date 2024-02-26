const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
      minute:{ type: Number },
       
       
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("minCharge", thisSchema);

//alltrade notification