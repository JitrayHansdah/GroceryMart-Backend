const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");


// ADD PRODUCT
const addProduct = async (req, res) => {

    try {

        const result =
            await cloudinary.uploader.upload(
                req.file.path
            );

        const product =
            await Product.create({

                name:
                    req.body.name,

                category:
                    req.body.category,

                price:
                    req.body.price,

                stock:
                    req.body.stock,

                description:
                    req.body.description,

                image:
                    result.secure_url,

            });

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message:
                error.message,
        });
    }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {

            return res.status(404).json({
                message: "Product Not Found",
            });
        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

    try {

        const updatedProduct =
            await Product.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                }
            );

        res.status(200).json(updatedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Product Deleted",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {

    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,

};