const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       rashi:{
        type: String, 
       },
      
       rashiImg:{
        type: Array,
    },
    desc:{
        type: String, 
    },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("rashiImg", thisSchema);
