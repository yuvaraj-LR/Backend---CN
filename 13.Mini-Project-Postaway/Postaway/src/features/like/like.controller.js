import LikeModel from "./like.model.js";
import PostModel from "../posts/posts.model.js";
import UserModel from "../user/user.model.js";

export default class LikeController {
    getLikes(req, res) {
        let postId = req.params.id;
        console.log(postId, "postIddd....");

        let validPost = PostModel.getPostById(postId);
        console.log(validPost, "validPost");
        
        if(validPost) {
            // get likes for the specific posts. 
            let getLikes = LikeModel.getLikes(postId);

            if(getLikes) {
                return res.status(200).json({status: true, message: getLikes});
            } else {
                return res.status(404).json({status: false, message: "Not able to show the likes."})
            }
        } else {
            return res.status(404).json({status: false, message: "Invalid PostId."})
        }
    }

    toggelLike(req, res) {
        let postId = req.params.id;
        console.log(postId, "postIddd....");

        let validPost = PostModel.getPostById(postId);
        console.log(validPost, "validPost");

        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;
        console.log(userId, "userId...");

        if(validPost) {
            let postLikeStatus = LikeModel.toggelLike(userId, postId);
            console.log(postLikeStatus, "poststatus...");

            if(postLikeStatus) {
                return res.status(200).json({status: true, message: postLikeStatus});
            } else {
                return res.status(404).json({status: false, message: "Not able to show the likes."});
            }
        } else {
            return res.status(404).json({status: false, message: "Invalid PostId!!"});
        }


    }
}