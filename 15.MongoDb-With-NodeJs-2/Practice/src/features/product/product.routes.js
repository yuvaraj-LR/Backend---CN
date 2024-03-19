
// 1. Import the required modules.
import express from "express";
import ProductController from "./product.controller.js";
import {uploadFile} from "../../middleware/fileUpload.middleware.js";

// 2. Intilize the express routes.
const routes = express.Router();

// 3. Use the Controller 
const productController = new ProductController();

// 4. Set routes.

// Get all products
routes.get("/", (req, res) => {
    productController.getAllProducts(req, res);
});

// Add a product
routes.post("/", uploadFile.single("imageUrl"), (req, res) => {productController.addProduct(req, res)});

// Search for a product
routes.get('/filter', (req, res) => {
    productController.filterProducts(req, res)
});

// Give rating to the product
routes.post("/rate", (req, res) => {
    productController.rateProduct(req, res)
});

// Get a single product
routes.get("/:id", (req, res) => {
    productController.getSingleProduct(req, res)
});



export default routes;