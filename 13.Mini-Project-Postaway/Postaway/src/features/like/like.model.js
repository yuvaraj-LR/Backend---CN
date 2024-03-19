export default class LikeModel {
    constructor(id, userId, postId, like) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.like = like
    }

    static getLikes(postId) {
        try{
            let likes = users.filter(x => x.postId == postId);
            return likes;
        } catch(error) {
            throw new Error(error);
        }
    }

    static toggelLike(userId, postId) {
        try {
            let likes = this.getLikes(postId);
            console.log(likes, "ValidateTheLike...");

            if(likes) {
                console.log(userId, postId);
                let usersLike = likes.find(x => x.userId == userId);
                console.log(usersLike.like, "Check for the user.");

                // Toggle the like.
                // If already there is like means unlike the post.
                if(usersLike.like) {
                    usersLike.like = false;
                    return usersLike;
                    // If it was in unlike me turn to like.
                } else if (!usersLike.like) {
                    usersLike.like = true;
                    return usersLike;
                    // Else create new like by inserting userId, postId.
                } else {
                    try {
                        let newUserLike = new LikeModel(users.length + 1, userId, postId, true);
                        users.push(newUserLike);
                        console.log(newUserLike, "new like with user id.");
                        return newUserLike;
                    } catch (error) {
                        throw new Error(error);
                    } 
                }
            }
        } catch (error) {
            throw new Error(error);
        }

        

    }


}

let users = [
    new LikeModel(1, 1, 1, true),
    new LikeModel(2, 2, 1, true),
    new LikeModel(3, 1, 2, true),
];