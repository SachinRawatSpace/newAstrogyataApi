const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
      userid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"},
       name:{
        type: String, 
       },
       email:{
        type: String, 
       },
       subject:{
        type: String, 
       },
       msg:{
        type: String, 
       },
       
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("contactus", thisSchema);
