// 1. Importing the required modules.
import express from "express";
import UserController from "./user.controller.js"

// Using the express handler.
const routes = express.Router();
const userController = new UserController();

// 2. Setup the required routes.
// Get all the users
routes.get("/getAllUser", userController.getAllUsers);
// SignUp
routes.post("/signUp", userController.signUp);
// SignIn
routes.post("/signIn", userController.signIn);

// 3. Exporting the route module. 
export default routes;