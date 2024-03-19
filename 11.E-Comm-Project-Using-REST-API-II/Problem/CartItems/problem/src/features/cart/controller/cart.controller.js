// Please don't change the pre-written code
// Import the necessary modules here

import { addToCart, removeFromCart } from "../model/cart.model.js";

export const addToCartController = (req, res) => {
  // Write your code here
  let userId = req.userId;
  console.log(userId, "userId");

  let productId = req.params.productId;
  let quantity = req.params.quantity;
  console.log(productId, "productId");
  console.log(quantity, "quantity");

  if (!isProductFound) {
    return res.send(400).send("Invalid Product Id.")
  }

  let addCart = addToCart(userId, productId, quantity);

  if(addCart) {
    return res.status(200).send(addCart);
  } else {
    return res.status(400).send("Item not found!!!");
  }
};

export const removeFromCartController = (req, res) => {
  // Write your code here
  let userId = req.userId;
  console.log(userId, "userId");

  let cartItemId = req.params.cartItemId;

  let error = removeFromCart(userId, cartItemId);

  if(error) {
    return res.status(400).send(error);
  } else {
    return res.status(200).send("Item Deleted Successfully.")
  }

};
