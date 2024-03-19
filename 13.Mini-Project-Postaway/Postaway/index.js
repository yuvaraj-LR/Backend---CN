// 1. Importing the required modules. 
import express from "express";
import bodyParser from "body-parser";

import UserRouter from "./src/features/user/user.routes.js";
import PostsRouter from "./src/features/posts/posts.routes.js";
import CommandRouter from "./src/features/comment/comment.routes.js";
import LikeRouter from "./src/features/like/like.routes.js";

import jwtAuth from "./src/middleware/jwtAuth.middleware.js";
import loggerMiddleware from "./src/middleware/logger.middleware.js";

// Creating the server.
const app = express();

// Setupping the log middleware.
app.use(loggerMiddleware);

// 2. Setup the requried middleware.
// Get the post data in the required format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3. Setup the API routes
app.use("/api/user/", UserRouter);
app.use("/api/posts/",jwtAuth, PostsRouter);
app.use("/api/comment/", jwtAuth, CommandRouter);
app.use("/api/like/", jwtAuth, LikeRouter);

// 4. Setup the defult path.
app.get("/", (req, res) => {
    return res.send("Hello everyone, Welcome to the project postaway.")
})

// 5. Handling the unknown path.
app.use((req, res) => {
    res.status(404).send("Sorry! you are in wrong path.")
})

// 6. Setup the server.
app.listen(3200, () => {
    console.log("Your server is listening on 3200.");
})
