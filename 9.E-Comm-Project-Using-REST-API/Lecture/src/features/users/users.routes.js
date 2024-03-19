// Import the required modules.
import express from "express";
import UserController from "./users.controller.js";

// Intilize the routes
const routes = express.Router();

// Deintilize the user class
const userController = new UserController();

// Setup the routes.
routes.post("/signUp", userController.signUp);
routes.post("/signIn", userController.signIn);

export default routes;