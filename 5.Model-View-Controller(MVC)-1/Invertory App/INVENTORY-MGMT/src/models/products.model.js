class ProductModel {

    constructor(_id, _name, _desc, _price, _imgURL) {
        this.id = _id,
        this.name = _name,
        this.desc = _desc,
        this.price = _price,
        this.imgURL = _imgURL
    }

    static get() {
        return products;
    }
}

var products = [
    new ProductModel(1, "Cs", "this is sample", 100, "../../static/img/books.jpg"),
    new ProductModel(2, "Cs", "this is sample", 100, "../../static/img/books.jpg"),
    new ProductModel(3, "Cs", "this is sample", 100, "../../static/img/books.jpg"),
    new ProductModel(4, "Cs", "this is sample", 100, "../../static/img/books.jpg"),
    new ProductModel(5, "Cs", "this is sample", 100, "../../static/img/books.jpg"),
]

module.exports = ProductModel;

