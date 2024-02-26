// models/Event.js
const { ObjectID, ObjectId } = require('bson');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    pooja_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "poojaList"

    },
    duration: {
        type: String,

    },
    desc: {
        type: String,

    },
    pooja_price: {
        type: Number,
        //  required: true
    },
    city: {
        type: String,
        // required: true
    },
    liveStreaming: {
        type: Boolean,
        //  default: true
    },
    time_slots: {
        type: Array,
        // required: true
    },
    location: {
        type: String,
        //  required: true
    },
    fullfill_location: {
        type: String,
        // required: true
    },
    benefits: {
        type: String,
        //  required: true
    },
    mode: {
        type: String,
        //required: true
    },
    poojaimg: {
        type: Array
    },
    product: [
        {
            name: {
                type: String,
                //  required: true
            },
            description: {
                type: String,
                // required: true
            },
            price: {
                type: Number,
                // required: true
            },
            image: {
                type: String,
                // required: true
            }
        },

    ]

    // product: [
    //     { type: Object }
    // ]
});

module.exports = mongoose.model('adminAddEvent', eventSchema);
