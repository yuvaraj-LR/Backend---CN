import { getDB } from "../../config/mongodb";

export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = id
    }

    static signUp(name, email, password, type) {
        let newUser = new UserModel(name, email, password, type);
        newUser.id = users.length + 1;

        users.push(newUser);

        return newUser;
    }

    static signIn(email, password) {
        let userData = users.find((u) => u.email == email && u.password == password);
        return userData;
    }

    static getAll() {
        return users;
    }
}

let users = [
    new UserModel("Admin Seller", "demo@demo.com", 1234, "Seller", 1)
];
