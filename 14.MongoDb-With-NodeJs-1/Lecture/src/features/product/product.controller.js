import ProductModel from "./product.model.js"
import ProductRepository from "./product.repository.js";

export default class ProductController {

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req, res) {
        try {
            let products = await this.productRepository.getAll();
            res.status(200).send(products);
        } catch (error) {
            console.log(error, "error in getAllProducts.");
        }
    }

    async addProduct(req, res) {
        const {name, desp, catagory, sizes, price} = req.body;
        const fileName = req.file.filename;

        const newRecord = new ProductModel(name, desp, fileName, catagory, parseFloat(price), sizes?.split(","));

        try {
            let productAdded = await this.productRepository.addProduct(newRecord);

            if(productAdded) {
                return res.status(200).send(productAdded);
            } else {
                return res.status(200).send("Failed to add in database.");
            }
        } catch (error) {
            console.log("Error in add Product.", error);
        }

        res.status(201).send(newRecord)
    }

    async getSingleProduct(req, res) {
        const id = req.params.id;

        try {
            let product = await this.productRepository.getById(id);

            if(!product) {
                res.status(404).send("Product not found!!!")
            } else {
                res.status(200).send(product);
            }

        } catch (error) {
            console.log(error, "error in getSingleProduct.");
        }
    }

    async filterProducts(req, res) {
        console.log("I am filter function.");
        const { minPrice, maxPrice, category } = req.query;
        
        try {
            let result = await this.productRepository.filter(minPrice, maxPrice, category);

            if(result) {
                return res.status(200).send(result);
            } else {
                return res.status(200).send("No Products available.")
            }
            
        } catch (error) {
            console.log(error, "error in filterProducts.");
        }
    }

    rateProduct(req, res) {
        try {
            const userId = req.userId;
            const {productId, rating} = req.query;

            const result = this.productRepository.rate(userId, productId, rating);
    
    
            // const result = ProductModel.rateProduct(userId, productId, rating);
    
            if(result) {
                res.status(400).send(result);
            } else {
                res.status(200).send("Login successfully.")
            }
        } catch(err) {
            console.log(err, "error in rateProduct.");
        }
        
    }
}