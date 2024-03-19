// 1. Importing the required modules.
import express from "express";
import CommandController from "./comment.controller.js";

// Using the express handler.
const routes = express.Router();

const commandController = new CommandController();

// 2. Setup the required routes.
// Add a new command
routes.post("/newComment/:id", commandController.newComment);
// Get all the posts command
routes.get("/getComment/:id", commandController.getComment);
// Update a command - a single user can post multiple comments on a single post. So, we are passing postId also.
routes.put("/post/:postId/updateComment/:id", commandController.updateComment);
// Delete a command - a single user can post multiple comments on a single post. So, we are passing postId also.
routes.delete("/post/:postId/deleteComment/:id", commandController.deleteComment);

// 3. Exporting the route module. 
export default routes;