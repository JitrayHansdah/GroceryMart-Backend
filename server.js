const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/AuthRoutes");
const protect = require("./middleware/authMiddleware");
const productRoutes = require("./routes/ProductRoutes");
const orderRoutes = require("./routes/OrderRoutes"); const paymentRoutes = require("./routes/PaymentRoutes");
const adminRoutes = require("./routes/AdminRoutes");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);


app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user,
    });
});

const server = http.createServer(app);



const io = new Server(server, {
    cors: {
        origin: "*",
    },
});




io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("send-location", (data) => {
        io.emit("receive-location", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});