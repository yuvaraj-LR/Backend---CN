// Please don't change the pre-written code
// Import the necessary modules here

import express, { urlencoded } from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import UserController from "./src/controllers/user.controller.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

//create routes here

const userController = new UserController();

// Show register and login pages.
app.get("/register", userController.getRegister);
app.get("/login", userController.getLogin);

// Post the data from register page.
app.post("/register", userController.addUser);

// Check for login status.
app.post("/login", userController.loginUser);

export default app;
