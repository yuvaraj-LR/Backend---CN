// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose"

let url = "mongodb://localhost:27017";

export const connectUsingMongoose = async () => {
  // write your code here
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected using mongoose");
  } catch (error) {
    console.log(error);
    console.log("Failed to connect with Mongoose.");
  }
};
