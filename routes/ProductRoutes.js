const express = require("express");
const upload =
    require("../middleware/upload");

const {

    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,

} = require("../controllers/ProductController");

const router = express.Router();


// ADD PRODUCT
router.post(
    "/",
    upload.single("image"),
    addProduct
);
// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);


module.exports = router;