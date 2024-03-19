
import { MongoClient } from "mongodb";

// const url = "mongodb://localhost:27017/ecomdb";
// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
// const url = "mongodb://127.0.0.1:27017/ecomdb";

let client;
export const connectToMongoDB = ()=>{
    try {
        MongoClient.connect(process.env.DB_URL)
        .then(clientInstance=>{
            client=clientInstance
            console.log("Mongodb is connected");
            counter(getDB());
            createIndexes(getDB());
        })
        .catch(err=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error, "errorr....");
    }
     
}

export const getDB = ()=>{
    return client.db();
}

export const getclient = () => {
    return client;
}

const counter = async(db) => {
    const existingCounter = await db.collection("counters").findOne({_id: "cartItemId"});

    if(!existingCounter) {
        await db.collection("counters").insertOne({_id: "cartItemId", value: 0});
    }
}

const createIndexes = async(db) => {
    try {
        await db.collection("products").createIndex({price: 1});
        await db.collection("products").createIndex({name: 1, catagory: -1});
        await db.collection("products").createIndex({desc: "text"});
        console.log("Indexes are added to products.");
    } catch (error) {
        console.log(error, "error in createIndexes...");
    }
}