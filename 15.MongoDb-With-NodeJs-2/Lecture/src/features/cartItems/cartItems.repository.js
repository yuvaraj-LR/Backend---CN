import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class CartRepository {
    async connectDB() {
        let db = getDB();
        return db.collection("cart");
    }
    
    constructor(){
        this.collection = "cartItems";
    }
    
    async add(productID, userID, quantity){
        try{
            const db = getDB();
            const collection = db.collection(this.collection)
            const id = await this.getNextCounter(db);
            // find the document
            // either insert or update
            // Insertion.
            await collection.updateOne(
                {productID:new ObjectId(productID), userID:new ObjectId(userID)},
                {
                    $setOnInsert: {_id:id},
                    $inc:{
                    quantity: quantity
                }},
                {upsert: true})

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    // async add(cartItem) {
    //     let collection = await this.connectDB();

    //     try {
    //         let db = getDB();
    //         const id = await this.getNextCounter(db);

    //         await collection.updateOne(
    //             {productID:new ObjectId(cartItem.productID), userID:new ObjectId(cartItem.userID)},
    //             {
    //                 $setOnInsert: {_id:id},
    //                 $inc:{
    //                 quantity: cartItem.quantity
    //             }},
    //             {upsert: true});

    //         return cartItem;
    //     } catch (error) {
    //         console.log(error, "error in add function.");
    //     }
    // }

    async delete(userID, cartItemID) {
        let collection = await this.connectDB();
        
        try {
            let deletedItems = await collection.deleteOne({userID: new ObjectId(userID)}, {_id: new ObjectId(cartItemID)});

            return deletedItems > 0;
        } catch (error) {
            throw new Error("Failed to delete.")
        }
    }

    async get(userID) {
        let collection = await this.connectDB();

        console.log(userID, "userID...");
        try {
            return await collection.find({_id : new ObjectId(userID)}).toArray();
        } catch (error) {
            console.log(error, "error in get function.");
        }
    }

    async getNextCounter(db){
        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'},
            {$inc:{value: 1}},
            {returnDocument:'after'}
        )  
        console.log(resultDocument);
        return resultDocument.value;
    }
}

export default CartRepository;