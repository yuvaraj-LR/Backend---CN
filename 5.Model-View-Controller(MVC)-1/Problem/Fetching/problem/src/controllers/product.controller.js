// Import the necessary modules here
import ProductModel from "../models/product.model.js";
import path from "path";

export default class ProductController {
  getProducts = (req, res) => {
    //  Write your code here
    const productModel = new ProductModel();
    console.log(productModel.fetchProducts());

    return res.sendFile(path.join(path.resolve(), "src", "views", "index.html"));

  };
}
