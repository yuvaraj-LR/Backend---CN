import ProductModel from "./product.model.js"

export default class ProductController {
    getAllProducts(req, res) {
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    addProduct(req, res) {
        const {name, desp, price, sizes} = req.body;

        const newProduct = {
            name,
            desp, 
            price : parseFloat(price),
            sizes : sizes.split(","),
            catagory: 2,
            imageUrl : req.file.filename
        }

        const newRecord = ProductModel.addProduct(newProduct)

        res.status(201).send(newRecord)
    }

    getSingleProduct(req, res) {
        const id = req.params.id;
        const product = ProductModel.getSingleProduct(id);

        if(!product) {
            res.status(404).send("Product not found!!!")
        } else {
            res.status(200).send(product);
        }
    }

    filterProducts(req, res) {
        const { minPrice, maxPrice, category } = req.query;
        const result = ProductModel.filter(+minPrice, +maxPrice,
        category);
        res.status(200).send(result);
    }

    rateProduct(req, res) {
        const {userId, productId, rating} = req.query;
        const result = ProductModel.rateProduct(userId, productId, rating);

        if(result) {
            res.status(400).send(result);
        } else {
            res.status(200).send("Login successfully.")
        }
    }
}