const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const thisSchema = new Schema(
    {
        pooja_name: {
            type: String,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("poojaList", thisSchema);
