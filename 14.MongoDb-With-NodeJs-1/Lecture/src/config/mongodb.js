import { MongoClient } from "mongodb";

const url = process.env.DB_URL;

let client;

export const connectToMongodb = () => {
    MongoClient.connect(url)
        .then(clientInstance => {
            client = clientInstance;
            console.log("MongoDb is connected.");
        })
        .catch(err => {
            console.log(err);
            console.log("DB not Connected!!!");
        })
}

export const getDB = () => {
    return client.db();
}