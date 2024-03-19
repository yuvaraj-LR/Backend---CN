// 1. Importing the modules.
import express from "express";
import PostController from "./posts.controller.js"
import { fileUploader } from "../../middleware/fileUpload.middleware.js";

const postController = new PostController();

// 2. Creating the routes.
const routes = express.Router();

// 3. Setup the routes.
// Add a new post
routes.post("/newPost", fileUploader.single("imageUrl"), postController.newPost);
// List all posts
routes.get("/getAllPosts", postController.getAllPosts);
// List all the users post. 
routes.get("/getUserPosts", postController.getUserPosts);
// List the post by id.
routes.get("/getPostById/:id", postController.getPostById);
// Update a post by id.
routes.put("/updatePost/:id", fileUploader.single("imageUrl"), postController.updatePost);
// Delete a post by id. 
routes.delete("/deletePost/:id", postController.deletePost);

// 4. Return to index.js
export default routes;