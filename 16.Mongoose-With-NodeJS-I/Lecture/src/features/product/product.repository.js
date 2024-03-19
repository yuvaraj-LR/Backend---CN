import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from 'mongoose';
import { ProductSchema } from './product.schema.js';
import { ReviewSchema } from './review.schema.js';
import { CategorySchema } from './category.schema.js';

const ProductModel = mongoose.model("Product", ProductSchema);
const ReviewModel = mongoose.model("Review", ReviewSchema);
const CategoryModel = mongoose.model("Categories", CategorySchema);

class ProductRepository{

    constructor(){
        this.collection = "products";
    }

    async add(productData) {
        console.log(productData, "products...");
        try {
            productData.categories = productData.category.split(",").map(e => e.trim());
            console.log(productData, "productData....");
            
            // 1. Add the product.
            const newProduct = new ProductModel(productData);
            const savedProduct = await newProduct.save();
            console.log(savedProduct, "savedProduct...");

            // 2.Update the categories.
            await CategoryModel.updateMany(
                {_id: {$in : productData.categories}},
                {$push: {products : new ObjectId(savedProduct._id)}}
            );

            return savedProduct;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
 
    // This method is working by mongodb.
    // async add(newProduct){
    //     try{
    //         // 1 . Get the db.
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         await collection.insertOne(newProduct);
    //         return newProduct;
    //     } catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }

    // This method is working by mongoose.
    

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async filter(minPrice, category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            // if(maxPrice){
            //     filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            // }
            if(category){
                filterExpression = {$or: [{category: {category}}, {filterExpression}]}
            }
            return await collection.find(filterExpression).toArray();
            
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    // This is not a good way to rate product.
    // async rate(userID, productID, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);

    //         // 1. Find the product using the productID.
    //         let product = await collection.findOne({_id: new ObjectId(productID)});
    //         console.log(product, "product....");

    //         // 2. Find the product has the userID.
    //         let userRating = product?.ratings?.find(r => r.userID == userID);
    //         console.log(userRating, "userRating....");

    //         if(userRating) {
    //             // 3. Update the Rating.
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
    //             }, {
    //                 $set: {
    //                     "ratings.$.rating": rating
    //                 }
    //             })
    //         } else {
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID)
    //             },{
    //                 $push: {ratings: {userID:new ObjectId(userID), rating}}
    //             })
    //         }
    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }

    // async rate(userID, productID, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);

    //         // 1. Remove the rating from the product.
    //         await collection.updateOne({
    //             _id: new ObjectId(productID)
    //         }, {
    //             $pull: {ratings: {userID: new ObjectId(userID)}}
    //         });

    //         // 2. Add the rating to the product.
    //         await collection.updateOne({
    //             _id: new ObjectId(productID)
    //         }, {
    //             $push: {ratings: {userID: new ObjectId(userID), rating}}
    //         })
    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }

    async rate(userID, productID, rating) {
        try {
            const productToBeUpdate = await ProductModel.findById(productID);
            console.log(productToBeUpdate, "updateProduct...");

            if(!productToBeUpdate) {
                throw new Error("Product not found.")
            }

            const userReview = await ReviewModel.findOne({product: new ObjectId(productID), user: new ObjectId(userID)});
            console.log(userReview, "reviewww....");

            if(userReview) {
                userReview.rating = rating;
                await userReview.save();
            } else {
                const newReview = new ReviewModel({
                    product: new ObjectId(productID), 
                    user: new ObjectId(userID),
                    rating
                })

                await newReview.save();
            }
        } catch (error) {
            console.log(error, "error in rateRepo...");
        }
    }

    async averagePrice() {
        try {
            const db = getDB();
            return await db.collection(this.collection).aggregate([
                {
                    $group: {
                        _id: "$category",
                        averagePrice: {$avg: "$price"}
                    }
                }
            ]).toArray();
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

}

export default ProductRepository;