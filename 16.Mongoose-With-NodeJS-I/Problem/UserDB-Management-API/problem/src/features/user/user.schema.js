// Import the necessary modules here
import mongoose from "mongoose";

// Start creating your user schema here
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: [3, "Name should be greater than 3 characters."],
        required: [true, "Please enter Name."]
    },
    email: {
        type: String,
        unique: [true, "Duplicate Email! Please try a different one."],
        // validate: [
        //     {
        //         validator: function (value) {
        //             // Updated regex for email validation
        //             return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        //         },
        //         message: "Please enter a valid email."
        //     }
        // ],
        required: [true, "Please enter Email."]
    },
    mobile: {
        type: String,
        unique: [true, "Duplicate Number! Please try different one."],
        required: [true, "Please enter Mobile Number."]
    },
    age: {
        type: Number,
        min: [0, "Age must be greater than 0."],
        max: [100, "Age must be lesser than 100."],
        required: [true, "Please enter Age."]
    }, 
    password: {
        type: String,
        // validate: [{
        //     validator: function(value) {
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        //     }.test(value)
        // }, "Password should be 8 - 12 characters including lower, upper, number, symbol."],
        required: [true, "Please enter Password."]
    }, 
    type: {
        type: String,
        enum: ["student", "fresher", "experienced"],
        required: [true, "Please enter type (student, fresher, experienced.)."]
    }
    
})