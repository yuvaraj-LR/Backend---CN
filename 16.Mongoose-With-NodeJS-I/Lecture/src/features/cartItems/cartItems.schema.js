import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }, 
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }, 
    quantity: Number
})