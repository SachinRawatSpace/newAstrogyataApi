const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {


        title: { type: String },
        mrp_price: {
            type: String,
        },
        offer_price: {
            type: String
        },
        image: {
            type: Array
        }
    },

    { timestamps: true }
);


module.exports = mongoose.model("package", thisSchema);

//alltrade notification