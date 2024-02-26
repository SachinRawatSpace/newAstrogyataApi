const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {

        youtube_link: {
            type: String,
        },


    },




    { timestamps: true }
);


module.exports = mongoose.model("video", thisSchema);
