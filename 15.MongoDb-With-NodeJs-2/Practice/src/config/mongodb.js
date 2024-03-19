import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb-1";

let client;

export const connectToMongodb = () => {
    MongoClient.connect(url)
        .then(clientInstance => {
            client = clientInstance;
            console.log("MongoDb is connected.");
            checkCounter(client.db());
        })
        .catch(err => {
            console.log("Not Connected!!!");
        })
}

export const getDB = () => {
    return client.db();
}

export const checkCounter = async(db) => {
    const existingCounter = await db.collection("counters").findOne({_id: "cartItemId"});

    if(!existingCounter) {
        await db.collection("counters").insertOne({_id: "cartItemId", value: 0});
    }
}