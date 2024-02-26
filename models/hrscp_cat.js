const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       hrscp_category:{
        type: String, 
       },
   
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("hrscpCategory", thisSchema);
