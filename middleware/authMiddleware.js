const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "No Token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Token Failed",
        });
    }
};

module.exports = protect;