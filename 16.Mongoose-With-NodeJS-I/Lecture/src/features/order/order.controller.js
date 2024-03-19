import OrderRepository from "./order.repository.js";


export default class OrderController {

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async order(req, res, next) {
        try {
            const userID = req.userID;
            await this.orderRepository.placeOrder(userID);
            res.status(200).send("Order placed.")

        } catch (error) {
            console.log(error);
            res.status(400).send("Error in order controller.")
        }
    }

}