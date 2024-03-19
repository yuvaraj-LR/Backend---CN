import PostModel from "./posts.model.js"
import UserModel from "../user/user.model.js";

export default class PostController {
    newPost(req, res) {
        let {caption} = req.body;
        let fileName = req.file.filename;

        // Get the user id by the user email came from jwt token...
        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;

        // Handling the edge case.
        let errorMessage;
        if(!caption || !userId) {
            if(!caption) {
                errorMessage.caption = "Caption are required";
            }

            if(!userId) {
                errorMessage.userId = "userId are required";
            }

            return res.status(406).json({status: false, message: errorMessage});
        }

        let post = PostModel.newPost(userId, caption, fileName);

        if (post) {
            return res.status(200).json({status: true, message: post})
        } else {
            return res.status(401).json({status: false, message:"Item not added."})
        }
    }

    getAllPosts(req, res) {
        let posts = PostModel.getAllPosts();

        if(posts) {
            return res.status(200).json({status: true, message: posts})
        }
    }

    getUserPosts(req, res) {
        // Get the user id by the user email came from jwt token...
        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;

        let userPosts = PostModel.getUserPosts(userId);

        if(userPosts.length < 1) {
            return res.status(200).send("User haven't add any posts.")
        }
        else if(userPosts) {
            return res.status(200).json({status: true, message: userPosts});
        } else {
            return res.status(404).json({status: false, message:"Invalid User."});
        }
    }

    getPostById(req, res) {
        let postId = req.params.id;
        console.log(postId, "postId....");

        let post = PostModel.getPostById(postId);

        if(post) {
            return res.status(200).json({status: true, message: post});
        } else {
            return res.status(404).json({status: false, message:"Invalid post Id."})
        }
    }

    updatePost(req, res) {
        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;
        console.log(userId, "userId...");

        let postId = req.params.postId;
        console.log(postId, "postId....");

        let userPosts = PostModel.validUser(userId, postId);

        // Check if the valid user was changing his post. 
        if(userPosts) {
            let {caption} = req.body;
            let fileName = req.file.filename;

            let errorMessage;
            if(!caption || !fileName) {
                if(!caption) {
                    errorMessage.caption = "Caption are required";
                }

                if(!userId) {
                    errorMessage.fileName = "File must be include";
                }

                return res.status(406).json({status: false, message: errorMessage});
            }

            let updatedPost = PostModel.updatePost(postId, caption, fileName);
    
            // Check the post was updated. 
            if (updatedPost) {
                return res.status(200).json({status: true, message: updatedPost});
            } else {
                return res.status(404).json({status: false, message:"Post was not updated."});
            }
        } else {
            return res.status(404).json({status: false, message: "You don't have this post id."});
        }
    }

    deletePost(req, res) {
        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;
        console.log(userId, "userId...");

        let postId = req.params.id;
        console.log(postId, "postId....");

        let userPosts = PostModel.validUser(userId, postId);

        // Check if the valid user was changing his post. 
        if(userPosts) {
            let deletedPost = PostModel.deletePost(postId);

            if (deletedPost) {
                return res.status(200).json({status: true, message: deletedPost});
            } else {
                return res.status(404).json({status: false, message:"Post was not updated."});
            } 
        }else {
            return res.status(404).json({status: false, message: "You don't have this post id."});
        }
    }
}