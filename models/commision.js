const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      category:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "productcategory",
       },
       product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "astromall"},
       comision_name:{
        type: String, 
       },
       comision_rate:{
        type: Number, 
       },
       
       status:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("commission", thisSchema);
