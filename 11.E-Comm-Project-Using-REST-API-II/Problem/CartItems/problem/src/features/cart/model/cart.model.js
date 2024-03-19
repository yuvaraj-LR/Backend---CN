// Please don't change the pre-written code
// Import the necessary modules here

let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Write your code here
  let newCartItem = new cartModel(userId, productId, quantity);
  cartItems.push(newCartItem);

  return newCartItem;
};

export const removeFromCart = (userId, cartItemId) => {
  // Write your code here
  let cartItemIndex = cartItems.findIndex(c => c.id == cartItemId);

  if (cartItemIndex !== -1) {
    cartItems.splice(cartItemIndex, 1);
  } else {
    return "Item not found in the cart.";
  }

};
