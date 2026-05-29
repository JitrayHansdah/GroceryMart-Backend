const express = require("express");

const router = express.Router();

const {

    placeOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,

} = require("../controllers/OrderController");


// PLACE ORDER
router.post("/", placeOrder);


// GET ALL ORDERS (ADMIN)
router.get("/", getAllOrders);


// UPDATE ORDER STATUS
router.put("/status/:id", updateOrderStatus);


// CANCEL ORDER
router.put("/cancel/:id", cancelOrder);


// GET USER ORDERS
router.get("/:userId", getOrders);


module.exports = router;