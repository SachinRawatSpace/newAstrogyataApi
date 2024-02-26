const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
  {


    title: { type: String },
    desc: {
      type: String,
    },

    userid: {
      type: mongoose.Schema.Types.ObjectId, ref: "user"
    },
  },

  { timestamps: true }
);


module.exports = mongoose.model("notification", thisSchema);

//alltrade notification