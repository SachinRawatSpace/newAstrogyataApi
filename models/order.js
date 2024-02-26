const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
    {


        cartId: {
            type: mongoose.Schema.Types.ObjectId, ref: "Checkout"
        },
        astroid: {
            type: mongoose.Schema.Types.ObjectId, ref: "astrologer"
        },
        status: {
            type: String,
            default: "Pending",
            // enum: ["Pending", "complete", "Cancel", "Delivery"]
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: "user"
        },
        razorpay_payment_id: {
            type: String,
        },
        orderId: {
            type: String,
        },
        orderNote: {
            type: String
        },
        date: {
            type: String
        },
        products: {
            type: mongoose.Schema.Types.ObjectId, ref: "consultant"
        }

    },

    { timestamps: true }
);


module.exports = mongoose.model("OrderTable", OrderSchema);
