export default class PostModel {

    constructor(id, userId, caption, imageUrl) {
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static newPost(userId, caption, imageUrl) {
        try {
            const newPost = new PostModel(posts.length + 1, userId, caption, imageUrl);
            posts.push(newPost);
            
            return newPost;
        } catch (error) {
            throw new Error(error);
        }
    }

    static getAllPosts() {
        try {
            return posts;
        } catch (error) {
            throw new Error(error);
        }
    }

    static getUserPosts(userId) {
        try {
            const userPosts = posts.filter(x => x.userId == userId);
            return userPosts;
        } catch (error) {
            throw new Error(error);
        }
    }

    static getPostById(postId) {
        try {
            const post = posts.find(x => x.id == postId);
            return post;
        } catch (error) {
            throw new Error(error);
        }
    }

    static validUser(userId, postId) {
        try {
            const userPosts = this.getUserPosts(userId);

            try {
                const validUser = userPosts.find(x => x.id == postId);
                return validUser;
            } catch (error) {
                throw new Error(error);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    static updatePost(postId, caption, imageUrl) {
        try {
            const post = posts.find(x => x.id == postId);

            post.caption = caption;
            post.imageUrl = imageUrl;

            return post;
        } catch (error) {
            throw new Error(error);
        }
    }

    static deletePost(postId) {
        try {
            const post = posts.find(x => x.id == postId);
            console.log(post, "postssss....");

            if(!post) {
                console.log("Item not found!!");
            } else {
                const postIndex = posts.findIndex(x => x.id == postId);
                posts.splice(postIndex, 1);
            }

            return post;
        } catch (error) {
            throw new Error(error);
        }
    }
}

var posts = [
    new PostModel(1, 1, "Iphone", "2024-02-11T07:17:13.384Z-Iphone.jpg"),
    new PostModel(2, 1, "Tablet", "2024-02-11T07:17:53.154Z-Tablet.jpg"),
    new PostModel(3, 2, "Smartphone", "2024-02-11T07:18:34.158Z-Android.jpg"),
    new PostModel(4, 1, "Women's Top", "2024-02-11T07:09:38.975Z-download.jpeg")
]

