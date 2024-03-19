export default class CommentModel {
    constructor(id, postId, userId, comment) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.comment = comment;
    }

    static newPostComment(postId, userId, comment) {
        try {
            let newCommentPost = new CommentModel(comments.length + 1, postId, userId, comment);
            comments.push(newCommentPost);
            return newCommentPost;
        } catch (error) {
            throw new Error(error);
        }
    }

    static getComment(postId) {
        try {
            let postComments = comments.filter(x => x.postId == postId);
            return postComments;
        } catch (error) {
            throw new Error(error);
        }
    }

    static validatePost(postId, commentId) {
        try {
            let validPost = comments.find(x => x.postId == postId && x.id == commentId);
            return validPost;
        } catch {
            throw new Error(error);
        }
    }

    static updateComment(id, comment) {
        try {
            let updateComment = comments.find(x => x.id == id);
            updateComment.comment = comment;
            return updateComment;
        } catch (error) {
            throw new Error(error);
        }
    }

    static deleteComment(id) {
        try {
            let deleteComment = comments.find(x => x.id == id);
            try {
                const deleteCommentIndex = comments.findIndex(x => x.id == id);
                comments.splice(deleteCommentIndex, 1);

                return deleteComment;
            } catch (error) {
                throw new Error(error);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

var comments = [
    new CommentModel(1, 1, 1, "I love Iphone Products."),
    new CommentModel(2, 2, 1, "I love Samsung Tablet." ),
    new CommentModel(3, 1, 1, "Apple products are always good.")
];