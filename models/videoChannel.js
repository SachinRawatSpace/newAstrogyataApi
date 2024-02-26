const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {

    astroid: 
        {type: Schema.Types.ObjectId, ref: "astrologer"},

    channelName: {
      type: String,
    },
   
      

  },




  { timestamps: true }
);


module.exports = mongoose.model("videoChannel", thisSchema);
