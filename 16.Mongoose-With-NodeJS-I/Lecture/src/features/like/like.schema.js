import mongoose from "mongoose"

export const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "types"
    },
    types: {
        type: String,
        enum: ["Product", "Category"]
    }
}).pre("save", (next) => {
    console.log("Save operations has been called.");
    next();
}).post("save", (doc) => {
    console.log(doc, "This document has posted.");
})