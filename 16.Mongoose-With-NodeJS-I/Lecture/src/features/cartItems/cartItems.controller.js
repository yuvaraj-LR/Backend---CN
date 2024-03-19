import CartItemModel from "./cartItems.model.js";
import CartRepository from "./cartItems.repository.js";
import { ObjectId } from "mongodb";

export class CartItemsController {

    constructor() {
        this.cartRepository = new CartRepository();
    }
    
    async add(req, res) {
        let { productID, quantity } = req.body;
        let userID = req.userID;

        userID = new ObjectId(userID);
        productID = new ObjectId(productID);

        try {
            // let cartItem = new CartItemModel(productID, userID, quantity);

            let cartDetails = await this.cartRepository.add(productID, userID, quantity);
            res.status(201).send(cartDetails);
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(req, res){
        const userID = req.userID;

        console.log(userID, "userID...");
        try {
            let cartDetails = await this.cartRepository.get(userID);
            console.log(cartDetails, "cartDetails....");
            res.status(201).send(cartDetails);
        } catch (error) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(req, res) {
        const userID = req.userID;
        const cartItemID = req.params;

        const isDeleted = await this.cartRepository.delete(userID, cartItemID);
        console.log(isDeleted, "deleted..");

        if (isDeleted) {
            return res.status(404).send(isDeleted);
        }
        return res
        .status(200)
        .send('Cart item is removed');
    }
}