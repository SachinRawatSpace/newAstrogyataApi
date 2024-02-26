const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      
       name:{
        type: String, 
       },
       desc:{
        type: String, 
       },
       img:{
        type:Array
       },
       status:{
        type:String,
        default:"Deactive"
       }
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("blogcategory", thisSchema);
