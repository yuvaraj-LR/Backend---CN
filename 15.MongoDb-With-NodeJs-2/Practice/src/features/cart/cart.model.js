export default class CartModel {
    constructor(productId, userId, quantity) {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }

    static add(productId, userId, quantity) {
        let cartItem = new CartModel(productId, userId, quantity);
        cartItem.id = cartItems.length + 1;

        cartItems.push(cartItem);
    }

    static getCartItemByUserId(userId) {
        return cartItems.filter(c => c.userId == userId);
    }

    static deleteItem(cartId) {
        let cartItem = cartItems.find(i => i.cartId == cartId);

        if(!cartItem) {
            return "Item Not found!!!"
        } else {
            const cartItemIndex = cartItems.findIndex(i => i.cartId == cartId);
            cartItems.splice(cartItemIndex, 1);
        }
    }
}

let cartItems = [
    new CartModel(1, 2, 1, 1),
    new CartModel(1, 1, 2, 2),
];