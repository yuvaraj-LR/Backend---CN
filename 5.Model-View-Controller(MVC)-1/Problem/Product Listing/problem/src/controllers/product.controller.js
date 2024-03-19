// Please don't change the pre-written code
// Import the necessary modules here

import ProductModel from "../models/product.model.js";
const productModel = new ProductModel();

export default class ProductController {
  getProducts = (req, res) => {
    // Write your code here
    let products = productModel.fetchProducts();
    console.log(products, "Products");

    res.render("product", {products : products});
    // console.log("page rendered.");
  };
};
