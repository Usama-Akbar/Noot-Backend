var express = require("express");
var router = express.Router();
require("dotenv").config();

const ProductController = require("../controllers/ProductController");
// Get Product List

router.get("/list", ProductController.productList);

// Get Specific Product

router.post("/get/:id", ProductController.specificProduct);

// Add Product
router.post("/add", ProductController.addProduct);

// Update Product

router.post("/update/:id", ProductController.updateProduct);

// Delete Product

router.post("/delete/:id", ProductController.deleteProduct);

module.exports = router;
