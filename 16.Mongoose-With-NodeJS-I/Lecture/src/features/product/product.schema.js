import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    name: String,
    desc: String,
    price: Number,
    imageUrl: String,
    category: String,
    sizes: [
        {
            type: Number
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ]

})