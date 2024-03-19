// Import necessary modules here
import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema({
    // Write your code 
    name: {
        type: String,
        required: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Book",
        }
    ]
});
