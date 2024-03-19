import { getDB } from "../../config/mongodb.js";

export default class UserRepository {
    async signUp(user) {
        try {
            // 1. Get the database.
            const db = getDB();
            // 2. Get the collection.
            const collection = db.collection("users");
            // 3. Insert the document.
            await collection.insertOne(user);
            return user;
        } catch (error) {
            throw new Error("Can't signUp")
        }
    }

    async signIn(email, password) {
        try {
            // 1. Get the database.
            const db = getDB();
            // 2. Get the collection.
            const collection = db.collection("users");
            // 3. Insert the document.
            return await collection.findOne({email, password});
        } catch (error) {
            throw new Error("Can't signIn")
        }
    }

    async findUserByEmail(email) {
        try {
            // 1. Get the database.
            const db = getDB();
            // 2. Get the collection.
            const collection = db.collection("users");
            // 3. Insert the document.
            return await collection.findOne({email});
        } catch (error) {
            throw new Error("Can't signIn")
        }
    }
}