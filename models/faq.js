const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const faqSchema = new Schema(
    {
     
      
      title:{
        type: String,
       // required:true
      },
      desc:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("faq", faqSchema);
