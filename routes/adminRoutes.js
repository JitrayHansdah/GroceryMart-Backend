const express = require("express");

const Order = require("../models/Order");

const router = express.Router();

// GET ALL ORDERS

router.get("/orders", async (req, res) => {

    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;