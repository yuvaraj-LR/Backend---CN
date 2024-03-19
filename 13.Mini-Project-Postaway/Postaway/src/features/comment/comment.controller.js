import CommentModel from "./comment.model.js";
import UserModel from "../user/user.model.js";
import PostModel from "../posts/posts.model.js";

export default class CommandController {
    newComment(req, res) {
        const postId = Number(req.params.id);

        // Get the user id by the user email came from jwt token...
        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;

        let validateUser = PostModel.validUser(userId, postId);

        if(validateUser) {
            const {comment} = req.body;
            let postComment = CommentModel.newPostComment(postId, userId, comment);
    
            if (postComment) {
                return res.status(200).json({status: true, message: postComment})
            } else {
                return res.status(401).json({status: false, message:"Item not added."})
            }
        } else {
            return res.status(404).json({status: false, message:"You don't have this post."})
        }
    }

    getComment(req, res) {
        const postId = req.params.id;

        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;

        let validateUser = PostModel.validUser(userId, postId);

        if(validateUser) {
            const comments = CommentModel.getComment(postId);

            if(comments.length < 1) {
                return res.status(404).json({status: true, message: "No comments added yet."})
            }

            if(comments) {
                return res.status(200).json({status: true, message: comments})
            } else {
                return res.status(404).json({status: false, message: "Comments not viewable."})
            }
        } else {
            return res.status(404).json({status: false, message:"You don't have this post."})
        }
    } 

    updateComment(req, res) {
        const postId = req.params.postId;
        console.log(postId, "postIddd");

        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;
        console.log(userId, "userIddd");

        let commentId = req.params.id;
        console.log(commentId, "commentId....");

        let validateUser = PostModel.validUser(userId, postId);

        if(validateUser) {
            
            let validatePost = CommentModel.validatePost(postId, commentId);

            if(validatePost) {
                let {comment} = req.body;
                const updateComment = CommentModel.updateComment(commentId, comment);
    
                if(updateComment) {
                    return res.status(200).json({status: true, message: updateComment})
                } else {
                    return res.status(404).json({status: false, message: "Comments are not viewable."})
                } 
            } else {
                return res.status(404).json({status: false, message:"You don't have this comment."})
            }
        } else {
            return res.status(404).json({status: false, message:"You don't have this post."})
        }
    }

    deleteComment(req, res) {
        const postId = req.params.postId;
        console.log(postId, "postIddd");

        let user = req.userId;
        let userId = UserModel.getUserById(user)?.id;
        console.log(userId, "userIddd");

        let commentId = req.params.id;
        console.log(commentId, "commentId....");

        let validateUser = PostModel.validUser(userId, postId);

        if(validateUser) {
            let validatePost = CommentModel.validatePost(postId, commentId);

            if(validatePost) {
                const deleteComment = CommentModel.deleteComment(commentId);
    
                if(deleteComment) {
                    return res.status(200).json({status: true, message: deleteComment})
                } else {
                    return res.status(404).json({status: false, message: "Comments are not viewable."})
                } 
            } else {
                return res.status(404).json({status: false, message:"You don't have this comment."})
            }
        } else {
            return res.status(404).json({status: false, message:"You don't have this post."})
        }
    }
}