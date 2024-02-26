const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    astroid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "astrologer",
    },
    userid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
   
    follow:{
      type:Boolean
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("astroFollowers", thisSchema);
