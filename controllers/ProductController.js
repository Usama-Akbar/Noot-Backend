const Product = require("../utils/Schema/Product/ProductSchema");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATABASE_URI);
const { ObjectId } = require("mongodb");
module.exports = {
  productList: async function (req, res, next) {
    try {
      const products = await client
        .db(process.env.DATA_BASE)
        .collection("products")
        .find()
        .toArray();
      if (products.length === 0) {
        res.json({
          message: "No products found!",
          result: true,
        });
      } else {
        res.json({ products, result: true });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  specificProduct: async function (req, res, next) {
    try {
      const id = req.params.id;
      const product = await client
        .db(process.env.DATA_BASE)
        .collection("products")
        .findOne({ _id: new ObjectId(id) });
      if (product === null) {
        res.json({
          message: "Product not found!",
          result: true,
        });
      } else {
        res.json({ product, result: true });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  addProduct: async function (req, res, next) {
    try {
      const { error } = Product.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        // Retrieve all validation errors
        const errorDetails = error.details.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        });

        return res.status(400).json({ errors: errorDetails });
      }
      const product = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        stock: parseInt(req.body.stock),
        rating: parseFloat(req.body.rating),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await client
        .db(process.env.DATA_BASE)
        .collection("products")
        .insertOne(product);
      if (result.insertedId) {
        res.json({
          message: "Product added successfully!",
          result: true,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  updateProduct: async function (req, res, next) {
    try {
      const { error } = Product.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        // Retrieve all validation errors
        const errorDetails = error.details.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        });

        return res.status(400).json({ errors: errorDetails });
      }
      const product = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        stock: parseInt(req.body.stock),
        rating: parseFloat(req.body.rating),
        updatedAt: new Date(),
      };
      const id = req.params.id;
      const result = await client
        .db(process.env.DATA_BASE)
        .collection("products")
        .updateOne({ _id: new ObjectId(id) }, { $set: product });
      if (result.matchedCount === 1) {
        res.json({
          message: "Product updated successfully!",
          result: true,
        });
      } else {
        res.json({
          message: "Product not found!",
          result: false,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  deleteProduct: async function (req, res, next) {
    try {
      const id = req.params.id;
      const result = await client
        .db(process.env.DATA_BASE)
        .collection("products")
        .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.json({
          message: "Product deleted successfully!",
          result: true,
        });
      } else {
        res.json({
          message: "Product not found!",
          result: false,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
};
