
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
routes.get("/", productController.getAllProducts);

// Add a product
routes.post("/", uploadFile.single("imageUrl"), productController.addProduct);

// Get a single product
routes.get("/:id", productController.getSingleProduct);

// Search for a product
routes.get('/filter', productController.filterProducts);

// Give rating to the product
routes.post("/rate", productController.rateProduct);

export default routes;