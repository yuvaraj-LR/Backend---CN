import mongoose from "mongoose"
import dotenv from "dotenv";
import {CategorySchema} from "../features/product/category.schema.js"

dotenv.config();

let url = process.env.DB_URL;

const CategoryModel = mongoose.model("Category", CategorySchema);

export const connectMoongose = async() => {
    try {
        // await mongoose.connect(url, {
        //     userNewUrlParser: true,
        //     useUnifiedTopology: true
        // });

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Mongodb is connected by Moongose....");
            addCategories();
        });
    } catch (error) {
        console.log(error, "error in connectMoongose...");
    }
}

async function addCategories() {
    const categoryModel = mongoose.model("Category", CategorySchema);

    let categories = await categoryModel.find();

    if(!categories || categories.length == 0) {
        await CategoryModel.insertMany([{name: "Books"}, {name: "Electronics"}, {name: "Clothings"}]);
    }

}