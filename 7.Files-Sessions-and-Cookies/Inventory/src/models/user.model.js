export default class UserModel {
    constructor (id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static getAll() {
        return users;
    }

    static registerNewUser(name, email, password) {
        let newUserObj = new UserModel(users.length + 1, name, email, password);
        console.log(newUserObj, "New User Object Data");
        users.push(newUserObj);
    }

    static checkDetails(email, password) {
        let status = false;
        users.forEach(element => {
            if(element.email == email && element.password == password) {
                status = true;
            }
        });

        return status;
    }
}

var users = [
    new UserModel(1, "Yuvaraj L R", "yuvaraj@test.com", "1234")
];