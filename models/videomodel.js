const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {

    astroAccount: 
        {type: Schema.Types.ObjectId, ref: "astrologer"},
        userAccount: 
        {type: Schema.Types.ObjectId, ref: "user"},
    channelName: {
      type: String,
    },
   
      

  },




  { timestamps: true }
);


module.exports = mongoose.model("videoModel", thisSchema);
