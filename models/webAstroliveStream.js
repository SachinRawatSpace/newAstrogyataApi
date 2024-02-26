const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {



        astroid: {
            type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
        },
        status: {
            type: String
        },
        videoliveStream: {
            type: String
        }


    },

    { timestamps: true }
);


module.exports = mongoose.model("webLiveStream", thisSchema);
