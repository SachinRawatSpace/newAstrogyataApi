const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
        astroid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "astrologer",
        },
        selectedPooja: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "adminAddEvent"
        },
        offer: {
            type: String,

        },
        pooja_price: {
            type: Number
        },
        duration: { type: String },
        location_of_pooja: {
            type: String,
        },
        fullfill_location: {
            type: String,
        },
        availablity_time: {
            type: String,
        },
        pooja_img: {
            type: Array
        },
        status: {
            type: String,
            default: "Active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("astorPoojaEvent", thisSchema);
