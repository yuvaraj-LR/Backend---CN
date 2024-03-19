import { getDB } from "../../config/mongodb.js";

class UserRepository {

    constructor() {
        this.collection = "users";
    }

    async signUp(userData) {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            await collection.insertOne(userData);
            return userData;
        } catch (error) {
            console.log(error, "error in user repo...");
        }
    }

    async findByEmail(email) {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            return await collection.findOne({email});
            
        } catch (error) {
            console.log(error, "error in findByEmail...");
            
        }
    }

    async getAllUsers() {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            return await collection.find({}).toArray();
        } catch (error) {
            
        }
    }

}

export default UserRepository;