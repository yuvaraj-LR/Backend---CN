import { getDB } from "../../config/mongodb.js";

export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id
    }

    static getAll() {
        return users;
    }
}

let users = [
    new UserModel("Admin Seller", "demo@demo.com", 1234, "Seller", 1)
];
