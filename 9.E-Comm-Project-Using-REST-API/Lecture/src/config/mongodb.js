import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

let client;

export const connectToMongodb = () => {
    MongoClient.connect(url)
        .then(clientInstance => {
            client = clientInstance;
            console.log("MongoDb is connected.");
        })
        .catch(err => {
            console.log("Not Connected!!!");
        })
}

export const getDB = () => {
    return client.db();
}