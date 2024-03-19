import CartModel from "./cart.model.js"

export default class CartController {
    addCart(req, res){
        const {productId, quantity} = req.body;
        const userIdJWT = req.userIdJWT;
        CartModel.add(productId, userIdJWT, quantity);

        res.status(201).send("Item has been added to cart.")
    }

    getCartItems(req, res) {
        const { userIdJWT } = req.userIdJWT;
        let cartItem = CartModel.getCartItemByUserId(userIdJWT);

        return res.status(200).send(cartItem)
    }

    deleteItem(req, res) {
        const { cartItemIndex } = req.body;
        let isDeleted = CartModel.deleteItem(cartItemIndex);

        if(isDeleted) {
            return res.status(400).send("Invalid cart Id!!!");
        } else {
            return res.status(200).send("Successfully Deleted.")
        }
    }
}
