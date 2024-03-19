import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export class ProductRepository {
    constructor() {
        this.collection = "products"
    }

    async getAll() {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            return await collection.find({}).toArray();
        } catch (error) {
            console.log(error, "error in getAll.");
        }
    }

    async addProduct(newProduct) {
        console.log(newProduct, "newProductsss...");
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            // let productData = {name, desc, imageUrl, category, price, sizes}

            await collection.insertOne(newProduct);
            return newProduct;
        } catch (error) {
            console.log(error, "error in addProduct.");
        }
    }

    async getSingleProduct(id) {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            return await collection.findOne({_id: new ObjectId(id)});
            
        } catch (error) {
            console.log(error, "error in getSingleProduct.");
        }
    }

    async filterProduct(minPrice, maxPrice, catagory) {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);
            
            let filterExpression = {};
            
            if(minPrice || maxPrice || catagory) {
                if(minPrice) {
                    filterExpression.price = {$gte: parseFloat(minPrice)}
                }

                if(maxPrice) {
                    filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
                }

                if(catagory) {
                    filterExpression.catagory = catagory
                }
            }    
            
            console.log(filterExpression, "filterExpresssion...");

            return await collection.find(filterExpression).toArray();

        } catch (error) {
            console.log(error, "error in filterProduct.");
        }
    }

    async rateProduct(userId, productId, rating){
        
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            // 1. Delete the rating of that product.
            await collection.updateOne(
                {_id: new ObjectId(productId)},
                {$pull: {ratings: {userId: new ObjectId(userId)}}}
            );

            // 2. Insert the new rating for that product.
            await collection.updateOne(
                {_id: new ObjectId(productId)},
                {$push: {ratings: {userId: new ObjectId(userId), rating}}}
            );
        } catch (error) {
            console.log(error, "error in rateProduct.");
        }
    }
}