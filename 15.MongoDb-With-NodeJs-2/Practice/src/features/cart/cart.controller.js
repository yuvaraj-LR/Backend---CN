import CartRepository from "./cart.repository.js";

export default class CartController {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    async addCart(req, res){
        const {productId, quantity} = req.body;
        const userId = req.userIdJWT;

        await this.cartRepository.add(userId, productId, quantity);
        res.status(201).send("Item has been added to cart.")
    }

    async getCartItems(req, res) {
        const userId = req.userIdJWT;
        console.log(userId, "userID....");

        let cartItem = await this.cartRepository.get(userId);
        return res.status(200).send(cartItem)
    }

    async deleteItem(req, res) {
        const { cartItemIndex } = req.body;
        console.log(cartItemIndex, "cartItem....");
        const userId = req.userIdJWT;
        console.log(userId, "userIddd...");

        await this.cartRepository.delete(userId, cartItemIndex);
        return res.status(200).send("Successfully Deleted.")
    }
}
