const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: "user"

        },
        astroId: {
            type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
        },
        status: {
            type: String
        },
        callStatus:{
            type: String
        },
        vc_status:{
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 0
        },
        type: {
            type: String
        },
        userdeductedAmt: {
            type: Number,
            default: 0
        },
        astroCredited: {
            type: Number,
            default: 0
        },
        adminCredited: {
            type: Number,
            default: 0
        },
        totalCredited: {
            type: Number,
            default: 0
        },
        userAmt: {
            type: Number,
            default: 0
        },
        totalDuration:{
            type: Number,
            default: 0
        },
        chatHistoryId:{
            type:String
        }

    },

    { timestamps: true }
);


module.exports = mongoose.model("callDuration", thisSchema);
