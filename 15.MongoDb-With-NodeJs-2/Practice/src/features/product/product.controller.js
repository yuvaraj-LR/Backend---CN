import ProductModel from "./product.model.js"
import { ProductRepository } from "./product.repository.js";

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository(); 
    }

    async getAllProducts(req, res) {
        // const products = ProductModel.getAll();
        let products = await this.productRepository.getAll();
        res.status(200).send(products);
    }

    async addProduct(req, res) {
        const {name, desc, price, category, sizes} = req.body;

        const product = new ProductModel(name, desc, req.file.filename, category, parseFloat(price), sizes?.split(","))

        try {
            const newProduct = await this.productRepository.addProduct(product);

            return res.status(201).send(newProduct)
        } catch (error) {
            console.log(error, "error in addProduct....");
        }
    }

    async getSingleProduct(req, res) {
        const id = req.params.id;
        const product = await this.productRepository.getSingleProduct(id);


        if(!product) {
            res.status(404).send("Product not found!!!")
        } else {
            res.status(200).send(product);
        }
    }

    async filterProducts(req, res) {
        const { minPrice, maxPrice, catagory } = req.body;

        const result = await this.productRepository.filterProduct(minPrice, maxPrice, catagory);

        res.status(200).send(result);
    }

    async rateProduct(req, res) {
        try {
            const userId = req.userIdJWT;
            const {productId, rating} = req.body;
    
            await this.productRepository.rateProduct(userId, productId, rating);
    
            res.status(400).send("Rating has been added.");    
        } catch (error) {
            res.status(200).send(error, "Error in rateProduct...")
        }

    }
}