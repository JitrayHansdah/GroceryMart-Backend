const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        items: [
            {
                name: String,
                price: Number,
                quantity: Number,
                image: String,
            },
        ],

        totalAmount: Number,

        deliveryAddress: String,

        paymentMethod: String,

        paymentStatus: String,

        paymentId: String,

        orderStatus: {
            type: String,

            enum: [
                "Pending",
                "Packed",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.model("Order", orderSchema);