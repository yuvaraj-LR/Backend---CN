// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";

const likeModel = new mongoose.model("Like", likeSchema);

export const likeRepo = async (user_id, job_id, model) => {
  // Write your code here
  let likeItem = {
    user: user_id,
    likeable: job_id,
    on_model: model
  };

  try {
    let like = new likeModel(likeItem);
    await like.save();
    return like;
  } catch (error) {
    console.log(error, "errorInLikeRepo...");
  }
};
export const getLikesRepo = async (id, on_model) => {
  // Write your code here
  

};
