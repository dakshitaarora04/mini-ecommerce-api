const express = require("express");
const router = express.Router();
const  products = require("../data/products");
// const { getProducts, getProductById } = require("../controllers/product.controller");
const{
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateProductPartial,
    deleteProduct
} = require("../controllers/product.controller");


router.get("/:id", getProductById);

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.patch("/:id", updateProductPartial);

router.delete("/:id", deleteProduct);
module.exports = router;

