import { ObjectId } from "mongodb";
import { getDB, getclient } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {

    constructor() {
        this.collection = "order"
    }

    async placeOrder(userID) {
        // The Pending operations to be performed here.
        const client = getclient();
        const session = client.startSession();

        try {
            const db = getDB();
            session.startTransaction();

            // 1. Get the total of the user's cart Item
            const items = await this.getTotalAmountOfCart(userID, session);
            // Find total amount.
            let totalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
            console.log(totalAmount, "itemsssss");

            // 2. Create a order record.
            const orderItem = new OrderModel(new ObjectId(userID), totalAmount, new Date());
            await db.collection(this.collection).insertOne(orderItem, {session});

            // 3. Reduce the stocks.
            for(let item of items) {
                await db.collection("products").updateOne(
                    {_id: item.productID},
                    {$inc: {stock: -item.quantity}},
                    {session}
                )
            } 

            // throw new Error("Test error.")

            // 4. Clear the cart items.
            await db.collection("cartItems").deleteMany({
                userID: new ObjectId(userID)
            }, {session});

            await session.commitTransaction();
            session.endSession();

            return;
            
        } catch (error) {
            console.log(error, "error in placeOrder in repo.");
            await session.abortTransaction();
            session.endSession();
        }
    }

    async getTotalAmountOfCart(userID, session) {

        let db = getDB();

        let items = await db.collection("cartItems").aggregate([
            // 1. Get the cart items for that particular user.
            {
                $match: {
                    userID: new ObjectId(userID)
                }
            },
            // 2. Get products from product collection for this user.
            {   
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            // 3. Unwind the productInfo.
            {
                $unwind: "$productInfo"
            }, 
            // 4. Calculate the total amount.
            {
                $addFields: {
                    "totalAmount": {
                        $multiply: ["$productInfo.price", "$quantity"]
                    }
                }
            }
        ], session).toArray()

        return items;
    };
}