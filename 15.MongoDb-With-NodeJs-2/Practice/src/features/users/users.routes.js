// Import the required modules.
import express from "express";
import UserController from "./users.controller.js";

// Intilize the routes
const routes = express.Router();

// Deintilize the user class
const userController = new UserController();

// Setup the routes.
routes.post("/signUp", (req, res)=> {
    userController.signUp(req, res);
});
routes.post("/signIn", (req, res)=> {
    userController.signIn(req, res);
});
routes.get("/getAllUsers", (req, res) => {
    userController.getAllUsers(req, res);
})

export default routes;