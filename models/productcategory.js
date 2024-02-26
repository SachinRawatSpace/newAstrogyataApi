const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {

        // astroId:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "astrologer",
        // },
        name: {
            type: String,
        },
        img:{
            type: Array,
        },

        desc: {
            type: String,
        },
        status: {
            type: String,
        },

    },

    { timestamps: true }
);


module.exports = mongoose.model("productcategory", thisSchema);
