const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {



        astroAccount: {
            type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
        },
        status: {
            type: Boolean
        },
        token: {
            type: String
        },

        channelName: {
            type: String
        },
        expiredAt: {
            type: String
        }


    },

    { timestamps: true }
);


module.exports = mongoose.model("astroLiveStream", thisSchema);
