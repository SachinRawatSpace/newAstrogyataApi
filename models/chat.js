const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "user" },
    astroid:{type: Schema.Types.ObjectId, ref: "astrologer"},
    msg: {
      type: String,
    },
    roomid: {
        type: Schema.Types.ObjectId, ref: "chatroom"
    },
     
    type:{
        type: String,
    },
    reciver: { type: Schema.Types.ObjectId, ref: "user" },
    sender:{type: Schema.Types.ObjectId, ref: "astrologer"},
    msgbysupport: {
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", thisSchema);
