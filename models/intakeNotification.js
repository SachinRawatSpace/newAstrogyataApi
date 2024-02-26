const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {


        chatIntekId: {
            type: mongoose.Schema.Types.ObjectId, ref: "intakeform"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: "user"

        },
        astroId: {
            type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
        }

    },

    { timestamps: true }
);


module.exports = mongoose.model("intakeNoti", thisSchema);
