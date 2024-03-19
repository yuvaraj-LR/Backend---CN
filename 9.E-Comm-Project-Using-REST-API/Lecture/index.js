// 1. Import the required modules.
import express from "express";
import swagger from "swagger-ui-express";

import ProductRouter from "./src/features/product/product.routes.js"
import UserRouter  from "./src/features/users/users.routes.js";
import CartRouter  from "./src/features/cart/cart.routes.js";
import bodyParser from "body-parser";
import jwtAuth from "./src/middleware/jwtAuth.middleware.js";
import apiDocs from "./swagger.json" assert { type: "json" };
import logMiddleware from "./src/middleware/logger.middleware.js";

import connectToMongodb from "./src/config/mongodb.js";
// 2. Create Server
const app = express();

// Get the post data in the required format
app.use(bodyParser.json());

// Add the file and store the login information
app.use(logMiddleware)

// For all the request to product with the same endpoint will redirect to ProductRouter.
// Api seperator with the endpoint.

// apiDocs -> show the API docs with swagger. 
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs))

// product -> ProductRouter
app.use("/api/products/", jwtAuth, ProductRouter)
// cart -> CartRouter
app.use("/api/cart/", jwtAuth, CartRouter);
// user -> UserRouter
app.use("/api/users/", UserRouter);

// 3. Set Routes
app.get("/", (req, res) => {
    res.send("Welcome to E-Comm Webpage.")
})

// Check if the server returns some errors.
// app.use((err, req, res, next) => {
//     console.log(err);
//     if(err) {
//         res.status(503).send("Oops! We inform this error to our developer. Please try again later.")
//     }
// })

// Check if the user enter the wrong pathname.
app.use((req, res) => {
    res.status(404).send("Sorry! you are in wrong path. Check our documentation for more (http://localhost:3200/api-docs).")
})

// 4. Host it in port.
app.listen(3200, ()=> {
    console.log("Your server was hosted on 3200.");
    connectToMongodb();
})
