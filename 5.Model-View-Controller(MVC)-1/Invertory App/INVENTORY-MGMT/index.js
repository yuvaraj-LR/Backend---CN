
const express = require('express');
const ProductController = require("./src/controllers/products.controller.js");
const path = require("path");
const ejsLayout = require("express-ejs-layouts");

const server = express();
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejsLayout)

const productController = new ProductController();
server.get('/', (req,res)=>{
    return productController.getProducts(req, res);
});

server.get("/new", (req, res) => {
    return productController.addNewProducts(req, res);
})

server.post("/", (req, res) => {
    return productController.displayProducts(req, res);
})

server.use(express.static("views/products.html"));

server.listen(3400, () => {
    console.log("Server is listening on 3400.");
});

