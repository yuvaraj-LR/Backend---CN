import { getDB, checkCounter } from "../../config/mongodb.js"
import { ObjectId } from "mongodb";

class CartRepository {
    constructor() {
        this.collection = "cartItems"
    }

    async add(userId, productId, quantity) {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);
            let id = await this.getNextCounter(db);

            // Check with the data whether for this userId and productId has cart Item.
            // If yes, then add the given quantity with previous quantity.
            // Else create a new data and insert the document.
            await collection.updateOne(
                {userId, productId}, 
                {
                    $setOnInsert: {_id: id},
                    $inc : {quantity}
                },
                {upsert: true}
            );

            // await collection.insertOne({userId, productId, quantity});
        } catch (error) {
            console.log(error, "error in add cart repo...");
        }
    }

    async get(userId) {
        console.log(userId, "userId...");
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            let cartItem = await collection.find({userId}).toArray();
            console.log(cartItem, "cartItem....");
            return cartItem;
            
        } catch (error) {
            console.log(error, "error in get cart repo...");
        }
    }

    async delete(userId, cartId) {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);

            await collection.deleteOne({userId}, {_id: new ObjectId(cartId)});
        } catch(error) {
            console.log(error, "error in delete cart repo...");
        }
    }

    async getNextCounter(db) {
        let counter = await db.collection("counters").findOneAndUpdate(
            {_id: "cartItemId"},
            {$inc: {value: 1}},
            {returnDocument: "after"}
        )

        console.log(counter, "counter...");
        return counter.value;
    }
}

export default CartRepository;