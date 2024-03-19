import { LikeRepository } from "./like.repository.js";

export class LikeController {
    constructor() {
        this.respository = new LikeRepository();
    }

    async likeItem(req, res) {
        try {
            const {id, type} = req.body;
            const userId = req.userID;

            if(type != "Product" && type != "Category") {
                return res.status(400).send("Invalid type!!!")
            }

            if(type == "Product") {
                this.respository.likeProduct(userId, id);
            } else {
                this.respository.likeCategory(userId, id);
            }

            return res.status(200).send("Like added.")
        } catch (error) {
            console.log(error, "error in likeItem...");
        }
    }

    async getLikes(req, res, next) {
        try {
            const {id, type} = req.query;

            const likes = await this.respository.getLikes(id, type);
            console.log(likes, "likess...");

            return res.status(200).send(likes);
        } catch (error) {
            console.log(error, "error in getLikes...");
        }
    }

    
}