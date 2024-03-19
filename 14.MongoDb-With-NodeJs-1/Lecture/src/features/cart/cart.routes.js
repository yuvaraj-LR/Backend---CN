// Import modules
import express from "express";
import CartController from "./cart.controller.js"

// Create routes handler.
const routes = express.Router();

// instantiation the class with variable.
let cartController = new CartController();

// Add elements to cart.
routes.post("/addCart", cartController.addCart);

// Get element for specific user.
routes.get("/getCartItems", cartController.getCartItems)

// Delete the cart items to specific user id. 
routes.delete("/deleteCartItem", cartController.deleteItem)

export default routes;