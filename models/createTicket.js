const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      // astroid:{
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "astrologer",
      // },
      subject:{
        type: String,
       // required:true
      },
      desc:{
        type: String, 
       },
       status:{
        type: String, 
        default:"Deactive"
       },
       ticketNo:{
        type: Number, 
       },
       reply:{
        type: String, 
       }
      },
     
    { timestamps: true }
  );


  module.exports = mongoose.model("Ticket", thisSchema);
