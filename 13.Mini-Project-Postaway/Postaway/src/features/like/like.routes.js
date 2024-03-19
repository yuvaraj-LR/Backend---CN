// 1. Importing the required modules.
import express from "express";
import LikeController from "./like.controller.js";

// Using the express handler.
const routes = express.Router();
// Instansiate the like controller.
const likeController = new LikeController();

// 2. Setup the required routes.
// Get all the likes on that post.
routes.get("/getLikes/:id", likeController.getLikes);
// Toggle a like.
routes.post("/toggleLike/:id", likeController.toggelLike);

// 3. Exporting the route module. 
export default routes;