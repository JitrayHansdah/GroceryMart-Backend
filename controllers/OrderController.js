const Order = require("../models/Order");


// PLACE ORDER
const placeOrder = async (req, res) => {

    try {

        const {
            userId,
            items,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            paymentStatus,
            paymentId,
        } = req.body;

        const order = await Order.create({

            userId,
            items,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            paymentStatus,
            paymentId,

        });

        res.status(201).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// GET USER ORDERS
const getOrders = async (req, res) => {

    try {

        const orders = await Order.find({

            userId: req.params.userId,

        }).sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// GET ALL ORDERS (ADMIN)
const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {

    try {

        const order =
            await Order.findByIdAndUpdate(

                req.params.id,

                {
                    orderStatus:
                        req.body.orderStatus,
                },

                {
                    new: true,
                }
            );

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// CANCEL ORDER
const cancelOrder = async (req, res) => {

    try {

        const order =
            await Order.findByIdAndUpdate(

                req.params.id,

                {
                    orderStatus: "Cancelled",
                },

                {
                    new: true,
                }
            );

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {

    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,

};