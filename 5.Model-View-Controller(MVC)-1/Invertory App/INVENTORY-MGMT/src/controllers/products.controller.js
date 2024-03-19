const path = require("path");
const ProductModel = require("../models/products.model.js");

class ProductController {
    getProducts(req, res) {
        console.log(path.resolve(), "dir path");
        // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));

        let products = ProductModel.get();
        // console.log(products, "productsssss");
        
        res.render("products", {products : products})
    }
    
    addNewProducts(req, res) {
        return res.render("new-product");
    }

    displayProducts(req, res) {
        let products = ProductModel.get();
        console.log(req.body, "boddyy");

        res.render("new-product", {products : products});
    }
}

module.exports = ProductController;
