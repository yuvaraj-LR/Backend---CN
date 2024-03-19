// Import modules
import express from "express";
import CartController from "./cart.controller.js"

// Create routes handler.
const routes = express.Router();

// instantiation the class with variable.
let cartController = new CartController();

// Add elements to cart.
routes.post("/addCart", (req, res) => {
    cartController.addCart(req, res);
});

// Get element for specific user.
routes.get("/getCartItems", (req, res) => {
    cartController.getCartItems(req, res);
})

// Delete the cart items to specific user id. 
routes.delete("/deleteCartItem", (req, res) => {
    cartController.deleteItem(req, res);
})

export default routes;