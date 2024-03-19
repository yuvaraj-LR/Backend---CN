import mongoose from "mongoose";
import { ObjectId } from "mongodb"
import { LikeSchema } from "./like.schema.js";

const LikeModel = new mongoose.model("Like", LikeSchema);

export class LikeRepository {
    async likeProduct(userId, productId) {
        try {
            const newLike = new LikeModel({
                user: userId,
                likeable: productId,
                types: "Product"
            });

            let savedData = await newLike.save();
            return savedData;
            
        } catch (error) {
            console.log(error, "error in likeProductRepo...");
        }
    }

    async likeCategory(userId, productId) {
        try {
            const newLike = new LikeModel({
                user: userId,
                likeable: productId,
                types: "Category"
            })

            newLike.save();
            
        } catch (error) {
            console.log(error, "error in likeCategoryRepo...");
        }
    }

    async getLikes(id, type) {
        console.log("I am hit...");
        return await LikeModel.find({
            likeable: new ObjectId(id),
            types: type
        }).populate('user').populate({path: "likeable", model: type});
    }
} 