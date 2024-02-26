const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       desc:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("aboutus", thisSchema);
