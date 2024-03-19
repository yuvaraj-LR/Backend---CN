import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ProductRepository {

    dbConnect() {
        // 1. Get the database.
        let db = getDB();
        // 2. Connect to collection.
        return db.collection("product");
    }

    async addProduct(product) {
        try {
            let collection = this.dbConnect();
            // 3. Push the data.
            await collection.insertOne(product);
            return product;
        } catch (error) {
            console.log(error, "error");
        }
    }

    async getAll() {
        try {
            let collection = this.dbConnect();
            return await collection.find().toArray();
        } catch (error) {
            console.log(error, "error");
        }
    }

    async getById(id) {
        try {
            let collection = this.dbConnect();
            return await collection.findOne({_id: new ObjectId(id)});
        } catch (error) {
            console.log(error, "error");
        }
    }

    async filter(minPrice, maxPrice, catagory) {
        try {
            let collection = this.dbConnect();

            let filterExpression= {};

            if(minPrice) {
                filterExpression.price = {$gte: parseFloat(minPrice)}
            } 

            if (maxPrice) {
                filterExpression.price = {...filterExpression, $lte: parseFloat(maxPrice)}
            }

            if(catagory) {
                filterExpression.catagory = catagory;
            }

            return await collection.find(filterExpression).toArray();
            
        } catch (error) {
            console.log(error, "error");
        }
    }

    async rate(userId, productId, rating) {
        try {
            let collection = this.dbConnect();

            collection.updateOne({_id: new ObjectId(productId)}, {$push: {ratings: {userId, rating}}});
            
        } catch (error) {
            console.log(error, "error from rate.");
        }
    }
}

export default ProductRepository;