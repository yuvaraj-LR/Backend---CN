export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static getAllUsers() {
        return users;
    }

    static signUp(name, email, password) {
        try {
            let newUser = new UserModel(users.length + 1, name, email, password);
            users.push(newUser);
            console.log("New User has successfully added.");
            return newUser;
        } catch (error) {
            throw new Error(error);
        }
    }

    static signIn(email, password) {
        try {
            let userData = users.find(u => u.email == email && u.password == password);
            return userData;
        } catch (error) {
            throw new Error(error);
        }
    }

    static getUserById(email) {
        try {
            let userData = users.find(u => u.email == email);
            return userData;
        } catch (error) {
            throw new Error(error);
        }
    }
}

var users = [
    new UserModel(1, "test", "test@test.com", 1234),
    new UserModel(2, "demo", "demo@demo.com", 4321)
];