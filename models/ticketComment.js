const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
     
      userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    
      desc:{
        type: String, 
       },
       status:{
        type: String, 
        //default:"Deactive"
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


  module.exports = mongoose.model("TicketComment", thisSchema);
